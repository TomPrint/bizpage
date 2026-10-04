import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const STORAGE_KEY = 'cookie-consent';
const CONSENT_VERSION = 1;

export interface CookieConsentChoices {
  /** Niezbędne cookies – zawsze aktywne, wymagane do działania strony. */
  necessary: true;
  /** Opcjonalne cookies analityczne – wymagają wyraźnej zgody. */
  analytics: boolean;
}

interface StoredConsent {
  version: number;
  choices: CookieConsentChoices;
  decidedAt: string;
}

/**
 * Darmowy, samodzielny serwis zgody na cookies zgodny z RODO/GDPR i ePrivacy:
 * - domyślnie wszystko poza niezbędnymi cookies jest WYŁĄCZONE (opt-in),
 * - użytkownik może wybrać zgody granularnie (per kategoria),
 * - zgodę można w każdej chwili wycofać/zmienić (panel preferencji),
 * - wybór jest zapisywany z wersją i datą (możliwość rozliczenia zgody).
 * Bez zewnętrznych, płatnych usług typu Cookiebot / OneTrust.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Czy pokazać baner (brak jeszcze podjętej decyzji lub użytkownik otworzył ustawienia). */
  readonly showBanner = signal(false);
  /** Czy pokazać rozwinięty panel z ustawieniami szczegółowymi. */
  readonly showPreferences = signal(false);
  /** Aktualne (zapisane lub domyślne) wybory użytkownika. */
  readonly choices = signal<CookieConsentChoices>({ necessary: true, analytics: false });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = this.readStored();
      if (stored) {
        this.choices.set(stored.choices);
        this.showBanner.set(false);
      } else {
        this.showBanner.set(true);
      }
    }
  }

  /** Akceptuje wszystkie kategorie cookies. */
  acceptAll(): void {
    this.save({ necessary: true, analytics: true });
  }

  /** Odrzuca wszystkie opcjonalne kategorie – zostają tylko niezbędne cookies. */
  rejectAll(): void {
    this.save({ necessary: true, analytics: false });
  }

  /** Zapisuje szczegółowo wybrane przez użytkownika kategorie z panelu preferencji. */
  savePreferences(analytics: boolean): void {
    this.save({ necessary: true, analytics });
  }

  /** Otwiera panel szczegółowych ustawień (z banera lub ponownie w dowolnym momencie, np. z linku w stopce). */
  openPreferences(): void {
    this.showBanner.set(true);
    this.showPreferences.set(true);
  }

  closePreferences(): void {
    this.showPreferences.set(false);
  }

  private save(choices: CookieConsentChoices): void {
    this.choices.set(choices);
    if (isPlatformBrowser(this.platformId)) {
      const record: StoredConsent = {
        version: CONSENT_VERSION,
        choices,
        decidedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    }
    this.showPreferences.set(false);
    this.showBanner.set(false);
  }

  private readStored(): StoredConsent | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as StoredConsent;
      if (parsed.version !== CONSENT_VERSION || !parsed.choices) return null;
      return parsed;
    } catch {
      return null;
    }
  }
}
