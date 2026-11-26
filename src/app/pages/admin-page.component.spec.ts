import { TestBed } from '@angular/core/testing';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { AdminService, Client, sortClients } from '../admin/admin.service';
import { AdminPageComponent, isFollowUpDue } from './admin-page.component';

describe('Follow-up reminders', () => {
  it('orders newly created clients before older records', () => {
    const old = { id: 'old', name: 'Adam', company: '' } as Client;
    const earlier = { id: 'earlier', name: 'Zofia', company: '', createdAt: Timestamp.fromMillis(1000) } as Client;
    const latest = { id: 'latest', name: 'Barbara', company: '', createdAt: Timestamp.fromMillis(2000) } as Client;
    expect(sortClients([old, earlier, latest]).map(item => item.id)).toEqual(['latest', 'earlier', 'old']);
  });

  it('marks today and earlier dates due, but not future dates or an empty date', () => {
    const now = new Date(2026, 10, 24, 0, 0);
    expect(isFollowUpDue('', now)).toBeFalse();
    expect(isFollowUpDue('2026-11-23', now)).toBeTrue();
    expect(isFollowUpDue('2026-11-24', now)).toBeTrue();
    expect(isFollowUpDue('2026-11-25', now)).toBeFalse();
  });

  describe('Admin panel', () => {
    const client: Client = {
      id: 'client-1', name: 'Klient', company: 'Firma', email: 'test@example.com',
      phone: '123', notes: '', followUp: '2000-01-01', industry: 'IT', size: 'MAŁY',
      lastActivity: '2026-11-24T10:30:00Z'
    };
    let admin: jasmine.SpyObj<AdminService>;

    beforeEach(async () => {
      admin = jasmine.createSpyObj<AdminService>('AdminService', [
        'initialize', 'login', 'clients', 'saveClient', 'activities', 'addActivity'
      ]);
      admin.initialize.and.callFake(callback => {
        callback({ uid: 'admin' } as User);
        return () => {};
      });
      admin.clients.and.resolveTo([client]);
      admin.saveClient.and.resolveTo();
      admin.activities.and.resolveTo([]);
      admin.addActivity.and.resolveTo();
      await TestBed.configureTestingModule({
        imports: [AdminPageComponent],
        providers: [{ provide: AdminService, useValue: admin }]
      }).compileComponents();
    });

    it('starts Google sign-in from the login button', async () => {
      admin.initialize.and.callFake(callback => {
        callback(null);
        return () => {};
      });
      admin.login.and.resolveTo();
      const fixture = TestBed.createComponent(AdminPageComponent);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(button.textContent).toContain('Zaloguj przez Google');
      button.click();
      await fixture.whenStable();
      expect(admin.login).toHaveBeenCalledOnceWith();
    });

    it('does not show client forms when Firestore denies access', async () => {
      admin.clients.and.rejectWith(new Error('permission-denied'));
      spyOn(console, 'error');
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent)
        .toContain('Sprawdź reguły Firestore i konto administratora');
      expect(fixture.nativeElement.querySelector('table')).toBeNull();
      expect(fixture.nativeElement.querySelector('form')).toBeNull();
    });

    it('displays a due reminder and saves edited client details', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('tr.due')?.textContent).toContain('do kontaktu');

      fixture.componentInstance.editClient(client);
      expect(fixture.componentInstance.client.nip).toBe('');
      expect(fixture.componentInstance.client.address).toBe('');
      fixture.componentInstance.client.nip = ' 1234567890 ';
      fixture.componentInstance.client.address = ' ul. Przykładowa 1, Warszawa ';
      fixture.componentInstance.client.industry = ' Handel ';
      fixture.componentInstance.client.size = 'DUŻY';
      fixture.componentInstance.client.followUp = '2030-01-01';
      await fixture.componentInstance.saveClient();
      expect(admin.saveClient).toHaveBeenCalledWith(
        jasmine.objectContaining({ name: 'Klient', nip: '1234567890', address: 'ul. Przykładowa 1, Warszawa', followUp: '2030-01-01', industry: 'Handel', size: 'DUŻY' }), client.id
      );
      expect(admin.clients).toHaveBeenCalledTimes(2);
      expect(fixture.componentInstance.view).toBe('table');
    });

    it('allows saving a client with every field empty', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      fixture.componentInstance.newClient();
      fixture.detectChanges();
      const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
      expect(form.querySelector('[name="nip"]')).toBeTruthy();
      expect(form.querySelector('[name="address"]')).toBeTruthy();
      expect(form.querySelector('[required]')).toBeNull();
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await fixture.whenStable();
      expect(admin.saveClient).toHaveBeenCalledWith({
        name: '', company: '', nip: '', address: '', email: '', phone: '', notes: '', followUp: '', industry: '', size: '', status: ''
      }, undefined);
      expect(fixture.componentInstance.view).toBe('table');
    });

    it('shows address and NIP in separate columns and keeps the address when editing', async () => {
      const withAddress = { ...client, nip: '1234567890', address: 'ul. Przykładowa 1' };
      admin.clients.and.resolveTo([withAddress]);
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      const headers = Array.from(fixture.nativeElement.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>)
        .map(cell => cell.textContent?.trim());
      const cells = fixture.nativeElement.querySelectorAll('tbody tr td') as NodeListOf<HTMLTableCellElement>;
      expect(cells[headers.indexOf('Adres')].textContent).toContain(withAddress.address);
      expect(cells[headers.indexOf('NIP')].textContent).toContain(withAddress.nip);
      expect(cells[headers.indexOf('Firma')].textContent).not.toContain(withAddress.nip);
      fixture.componentInstance.editClient(withAddress);
      expect(fixture.componentInstance.client.address).toBe(withAddress.address);
    });

    it('shows separate contact columns and opens client details and activities', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('a[href="mailto:test@example.com"]')?.textContent).toContain('test@example.com');
      expect(element.querySelector('a[href="tel:123"]')?.textContent).toContain('123');
      expect(element.querySelector('tbody')?.textContent).toContain('IT');
      expect(element.querySelector('tbody')?.textContent).toContain('MAŁY');
      expect(element.querySelector('tbody')?.textContent).toContain('24.11.2026');
      element.querySelector<HTMLButtonElement>('button[aria-label="Szczegóły i aktywności"]')?.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(element.textContent).toContain('Szczegóły: Firma');
      expect(element.textContent).toContain('Aktywności');
      Array.from(element.querySelectorAll('button')).find(button => button.textContent?.trim() === 'Wróć do tabeli')?.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.selected).toBeNull();
    });

    it('records an activity for the selected client and refreshes its history', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      const component = fixture.componentInstance;
      await component.selectClient(client);
      component.activityType = 'E-mail';
      component.activityDate = '2026-11-24';
      component.activityNotes = '  Oferta  ';
      component.activityStatus = 'unchanged';
      await component.addActivity();
      expect(admin.addActivity).toHaveBeenCalledWith(client.id, {
        type: 'E-mail', date: '2026-11-24', notes: 'Oferta'
      });
      expect(admin.activities).toHaveBeenCalledTimes(2);
    });

    it('rejects an activity with no date, type or notes', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      const component = fixture.componentInstance;
      await component.selectClient(client);
      await component.addActivity();
      expect(admin.addActivity).not.toHaveBeenCalled();
      expect(component.error()).toContain('Uzupełnij');
    });
  });
});
