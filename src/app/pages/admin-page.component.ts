import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, NgZone, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { User } from 'firebase/auth';
import { Activity, AdminService, Client, ClientData, ClientStatus, isValidActivity } from '../admin/admin.service';

export function isFollowUpDue(date: string, now: Date): boolean {
  if (!date) return false;
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return date <= today;
}

function emptyClient(): ClientData {
  return { name: '', company: '', nip: '', address: '', email: '', phone: '', notes: '', followUp: '', industry: '', size: '', status: '' };
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnDestroy {
  private readonly admin = inject(AdminService);
  private readonly meta = inject(Meta);
  private readonly previousRobots = this.meta.getTag('name="robots"')?.getAttribute('content');
  private unsubscribe?: () => void;
  private timer?: ReturnType<typeof setInterval>;
  private sessionVersion = 0;
  private activityVersion = 0;
  readonly user = signal<User | null>(null);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly accessGranted = signal(false);
  readonly error = signal('');
  readonly clients = signal<Client[]>([]);
  readonly activities = signal<Activity[]>([]);
  readonly now = signal(new Date());
  selected: Client | null = null;
  view: 'table' | 'form' | 'details' = 'table';
  search = '';
  sortBy: 'createdAt' | 'name' | 'industry' = 'createdAt';
  editingId: string | undefined;
  client: ClientData = emptyClient();
  activityType: Activity['type'] = '';
  activityDate = '';
  activityNotes = '';
  activityStatus: ClientStatus | 'unchanged' = '';

  get visibleClients(): Client[] {
    const query = this.search.trim().toLocaleLowerCase('pl');
    const digits = query.replace(/\D/g, '');
    const clients = this.clients().filter(client => {
      const nip = client.nip ?? '';
      return !query || [client.name, client.company, nip].some(value => (value ?? '').toLocaleLowerCase('pl').includes(query)) ||
        (!!digits && /^[\d\s-]+$/.test(query) && nip.replace(/\D/g, '').includes(digits));
    });
    if (this.sortBy === 'createdAt') return clients;
    return clients.sort((a, b) => {
      const first = this.sortBy === 'name' ? a.company || '' : a.industry || '';
      const second = this.sortBy === 'name' ? b.company || '' : b.industry || '';
      return first.localeCompare(second, 'pl', { sensitivity: 'base' }) ||
        (a.company || '').localeCompare(b.company || '', 'pl') ||
        a.id.localeCompare(b.id);
    });
  }

  constructor() {
    inject(Title).setTitle('Panel administracyjny | WickyWave');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      try {
        this.unsubscribe = this.admin.initialize(
          user => void this.onAuthChanged(user),
          error => { this.loading.set(false); this.error.set(error.message); }
        );
        const zone = inject(NgZone);
        this.timer = zone.runOutsideAngular(() =>
          setInterval(() => zone.run(() => this.now.set(new Date())), 60_000)
        );
      } catch (error) {
        this.loading.set(false);
        this.showError(error);
      }
    }
  }

  ngOnDestroy(): void {
    this.sessionVersion++;
    this.unsubscribe?.();
    if (this.timer) clearInterval(this.timer);
    if (this.previousRobots != null) {
      this.meta.updateTag({ name: 'robots', content: this.previousRobots });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }

  async login(): Promise<void> {
    this.busy.set(true);
    this.error.set('');
    try {
      await this.admin.login();
    } catch (error) {
      this.showError(error, 'Nie udało się zalogować przez Google. Sprawdź konfigurację Firebase i ustawienia okien wyskakujących.');
    } finally {
      this.busy.set(false);
    }
  }

  async logout(): Promise<void> {
    this.busy.set(true);
    this.error.set('');
    try {
      await this.admin.logout();
    } catch (error) {
      this.showError(error, 'Nie udało się wylogować.');
    } finally {
      this.busy.set(false);
    }
  }

  newClient(): void {
    this.closeActivities();
    this.editingId = undefined;
    this.client = emptyClient();
    this.view = 'form';
  }

  showClients(): void {
    this.closeActivities();
    this.view = 'table';
    this.editingId = undefined;
    this.error.set('');
  }

  editClient(client: Client): void {
    this.closeActivities();
    this.editingId = client.id;
    this.client = {
      name: client.name, company: client.company, nip: client.nip ?? '', address: client.address ?? '', email: client.email,
      phone: client.phone, notes: client.notes, followUp: client.followUp,
      industry: client.industry ?? '', size: client.size ?? '', status: client.status ?? ''
    };
    this.view = 'form';
  }

  async saveClient(): Promise<void> {
    this.busy.set(true);
    this.error.set('');
    try {
      await this.admin.saveClient({
        ...this.client,
        name: this.client.name.trim(),
        company: this.client.company.trim(),
        nip: this.client.nip.trim(),
        address: this.client.address.trim(),
        email: this.client.email.trim(),
        phone: this.client.phone.trim(),
        notes: this.client.notes.trim(),
        industry: this.client.industry.trim()
      }, this.editingId);
      this.showClients();
      await this.loadClients();
    } catch (error) {
      this.showError(error, 'Nie udało się zapisać lub odświeżyć danych klienta.');
    } finally {
      this.busy.set(false);
    }
  }

  async selectClient(client: Client): Promise<void> {
    this.selected = client;
    this.activityType = '';
    this.activityDate = '';
    this.activityNotes = '';
    this.activityStatus = '';
    this.activities.set([]);
    this.error.set('');
    this.view = 'details';
    await this.loadActivities(client);
  }

  closeActivities(): void {
    this.activityVersion++;
    this.selected = null;
    this.activities.set([]);
    this.error.set('');
  }

  private async loadActivities(client: Client): Promise<void> {
    const version = ++this.activityVersion;
    try {
      const activities = await this.admin.activities(client.id);
      if (version === this.activityVersion) this.activities.set(activities);
    } catch (error) {
      if (version === this.activityVersion) this.showError(error, 'Nie udało się pobrać aktywności.');
    }
  }

  async addActivity(): Promise<void> {
    const selected = this.selected;
    if (!selected) {
      this.error.set('Wybierz klienta.');
      return;
    }
    const activity: Omit<Activity, 'id'> = {
      type: this.activityType,
      date: this.activityDate,
      notes: this.activityNotes.trim(),
      ...(this.activityStatus === 'X' || this.activityStatus === 'V' ? { status: this.activityStatus } : {})
    };
    if (!isValidActivity(activity) || !this.activityStatus) {
      this.error.set('Uzupełnij rodzaj, poprawną datę, status i notatkę aktywności.');
      return;
    }
    this.busy.set(true);
    this.error.set('');
    let saved = false;
    try {
      await this.admin.addActivity(selected.id, activity);
      saved = true;
      this.activityType = '';
      this.activityDate = '';
      this.activityNotes = '';
      this.activityStatus = '';
      if (this.selected?.id === selected.id) {
        await Promise.all([this.loadActivities(selected), this.loadClients()]);
      }
    } catch (error) {
      this.showError(error, saved
        ? 'Aktywność została zapisana, ale nie udało się odświeżyć danych. Odśwież panel.'
        : 'Nie udało się zapisać aktywności. Odśwież panel i spróbuj ponownie.');
    } finally {
      this.busy.set(false);
    }
  }

  isDue(client: Client): boolean {
    return isFollowUpDue(client.followUp, this.now());
  }

  private async onAuthChanged(user: User | null): Promise<void> {
    const version = ++this.sessionVersion;
    this.activityVersion++;
    this.user.set(user);
    this.accessGranted.set(false);
    this.clients.set([]);
    this.activities.set([]);
    this.selected = null;
    this.newClient();
    this.view = 'table';
    this.activityDate = '';
    this.activityNotes = '';
    this.error.set('');
    if (user) {
      try {
        const clients = await this.admin.clients();
        if (version === this.sessionVersion) {
          this.clients.set(clients);
          this.accessGranted.set(true);
        }
      } catch (error) {
        if (version === this.sessionVersion) this.showError(error, 'Nie udało się pobrać klientów. Sprawdź reguły Firestore i konto administratora.');
      }
    }
    if (version === this.sessionVersion) this.loading.set(false);
  }

  private async loadClients(): Promise<void> {
    const clients = await this.admin.clients();
    this.clients.set(clients);
    if (this.selected) this.selected = clients.find(client => client.id === this.selected?.id) ?? null;
  }

  private showError(error: unknown, message?: string): void {
    console.error(message ?? 'Błąd panelu administracyjnego.', error);
    this.error.set(message ?? (error instanceof Error ? error.message : 'Wystąpił nieznany błąd.'));
  }
}
