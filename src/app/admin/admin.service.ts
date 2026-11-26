import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  Firestore, Timestamp, addDoc, collection, doc, getDocs, getFirestore, runTransaction, serverTimestamp, updateDoc
} from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

export type ClientStatus = '' | 'X' | 'V';

export interface ClientData {
  name: string;
  company: string;
  nip: string;
  address: string;
  email: string;
  phone: string;
  notes: string;
  followUp: string;
  industry: string;
  size: '' | 'MAŁY' | 'ŚREDNI' | 'DUŻY';
  status: ClientStatus;
}

export interface Client extends Omit<ClientData, 'nip' | 'address' | 'industry' | 'size' | 'status'> {
  id: string;
  nip?: string;
  address?: string;
  industry?: string;
  size?: ClientData['size'];
  status?: ClientStatus;
  createdAt?: Timestamp;
  lastActivity?: string;
}

export interface Activity {
  id: string;
  type: 'Telefon' | 'E-mail' | '';
  date: string;
  notes: string;
  status?: Exclude<ClientStatus, ''>;
}

export function isValidActivity(activity: Omit<Activity, 'id'>): boolean {
  const date = new Date(`${activity.date}T00:00:00Z`);
  return (activity.type === 'Telefon' || activity.type === 'E-mail') &&
    /^\d{4}-\d{2}-\d{2}$/.test(activity.date) &&
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === activity.date &&
    !!activity.notes.trim();
}

export function sortClients(clients: Client[]): Client[] {
  return clients.sort((a, b) =>
    (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0) ||
    (a.name || a.company || '').localeCompare(b.name || b.company || '', 'pl') ||
    a.id.localeCompare(b.id)
  );
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private app?: FirebaseApp;
  private auth?: Auth;
  private db?: Firestore;

  initialize(callback: (user: User | null) => void, onError: (error: Error) => void): () => void {
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
      throw new Error('Brak konfiguracji Firebase. Uzupełnij dane aplikacji zgodnie z instrukcją w README.');
    }
    this.app ??= initializeApp(firebaseConfig, 'admin');
    this.auth ??= getAuth(this.app);
    this.db ??= getFirestore(this.app);
    return onAuthStateChanged(this.auth, callback, onError);
  }

  async login(): Promise<void> {
    await signInWithPopup(this.requireAuth(), new GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    await signOut(this.requireAuth());
  }

  async clients(): Promise<Client[]> {
    const snapshot = await getDocs(collection(this.requireDb(), 'clients'));
    const clients = await Promise.all(snapshot.docs.map(async item => {
      const data = item.data();
      if (data['activitySummaryVersion'] === 1 && typeof data['lastActivity'] !== 'string') {
        throw new Error('Niepoprawne podsumowanie aktywności klienta.');
      }
      return {
        ...data as Client,
        id: item.id,
        lastActivity: data['activitySummaryVersion'] === 1
          ? data['lastActivity']
          : await this.initializeActivitySummary(item.id)
      };
    }));
    return sortClients(clients);
  }

  async saveClient(client: ClientData, id?: string): Promise<void> {
    const db = this.requireDb();
    if (id) {
      await updateDoc(doc(db, 'clients', id), { ...client });
    } else {
      await addDoc(collection(db, 'clients'), {
        ...client, createdAt: serverTimestamp(), lastActivity: '', activitySummaryVersion: 1
      });
    }

  }

  async activities(clientId: string): Promise<Activity[]> {
    const snapshot = await getDocs(collection(this.requireDb(), 'clients', clientId, 'activities'));
    return snapshot.docs.map(item => ({ ...item.data() as Omit<Activity, 'id'>, id: item.id }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  async addActivity(clientId: string, activity: Omit<Activity, 'id'>): Promise<void> {
    if (!isValidActivity(activity)) throw new Error('Uzupełnij rodzaj, poprawną datę i notatkę aktywności.');
    const db = this.requireDb();
    const clientRef = doc(db, 'clients', clientId);
    const activityRef = doc(collection(clientRef, 'activities'));
    await runTransaction(db, async transaction => {
      const client = await transaction.get(clientRef);
      if (!client.exists()) throw new Error('Klient nie istnieje.');
      const data = client.data();
      if (data['activitySummaryVersion'] !== 1 || typeof data['lastActivity'] !== 'string') {
        throw new Error('Brak podsumowania aktywności. Odśwież panel i spróbuj ponownie.');
      }
      const lastActivity: string = data['lastActivity'];
      transaction.set(activityRef, activity);
      transaction.update(clientRef, {
        lastActivity: activity.date > lastActivity ? activity.date : lastActivity,
        ...(activity.status ? { status: activity.status } : {})
      });
    });
  }

  private async initializeActivitySummary(clientId: string): Promise<string> {
    const activities = await this.activities(clientId);
    const latest = activities.find(activity => activity.date)?.date ?? '';
    const db = this.requireDb();
    const clientRef = doc(db, 'clients', clientId);
    return runTransaction(db, async transaction => {
      const client = await transaction.get(clientRef);
      if (!client.exists()) throw new Error('Klient nie istnieje.');
      const data = client.data();
      if (data['activitySummaryVersion'] === 1) {
        if (typeof data['lastActivity'] !== 'string') throw new Error('Niepoprawne podsumowanie aktywności klienta.');
        return data['lastActivity'] as string;
      }
      transaction.update(clientRef, { lastActivity: latest, activitySummaryVersion: 1 });
      return latest;
    });
  }

  private requireAuth(): Auth {
    if (!this.auth) throw new Error('Firebase Authentication nie jest skonfigurowane.');
    return this.auth;
  }

  private requireDb(): Firestore {
    if (!this.db) throw new Error('Firestore nie jest skonfigurowany.');
    return this.db;
  }
}
