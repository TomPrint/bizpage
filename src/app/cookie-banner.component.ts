import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from './cookie-consent.service';
import { I18nService } from './i18n/i18n.service';

/**
 * Baner zgody na cookies zgodny z RODO/GDPR i normami UE (ePrivacy):
 * - domyślnie brak zgody (opt-in), niezbędne cookies zawsze aktywne,
 * - możliwość udzielenia zgody granularnie per kategoria (panel "Dostosuj"),
 * - zgodę można w każdej chwili zmienić/wycofać (link w stopce otwiera ten sam panel).
 * Darmowe, samodzielne rozwiązanie – bez zewnętrznych, płatnych dostawców.
 */
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (consent.showBanner()) {
      <div
        class="cookie-banner"
        [class.cookie-banner-simple]="!consent.showPreferences()"
        role="dialog"
        aria-live="polite"
        aria-label="Zgoda na pliki cookie"
      >
        @if (!consent.showPreferences()) {
          <p class="cookie-text">
            {{ t('cookie.text') }}
            <a routerLink="/privacy-policy" class="cookie-link">{{ t('cookie.policyLink') }}</a>
          </p>
          <div class="cookie-actions">
            <button type="button" class="cookie-btn cookie-btn-manage" (click)="consent.openPreferences()">
              {{ t('cookie.manage') }}
            </button>
            <button type="button" class="cookie-btn cookie-btn-decline" (click)="consent.rejectAll()">
              {{ t('cookie.decline') }}
            </button>
            <button type="button" class="cookie-btn cookie-btn-accept" (click)="consent.acceptAll()">
              {{ t('cookie.accept') }}
            </button>
          </div>
        } @else {
          <div class="cookie-prefs">
            <h2 class="cookie-prefs-title">{{ t('cookie.prefsTitle') }}</h2>
            <p class="cookie-prefs-desc">{{ t('cookie.prefsDesc') }}</p>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <span class="cookie-category-name">{{ t('cookie.necessary.title') }}</span>
                <span class="cookie-toggle cookie-toggle-on cookie-toggle-locked" aria-hidden="true">
                  <span class="cookie-toggle-dot"></span>
                </span>
              </div>
              <p class="cookie-category-desc">{{ t('cookie.necessary.desc') }}</p>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <span class="cookie-category-name">{{ t('cookie.analytics.title') }}</span>
                <button
                  type="button"
                  class="cookie-toggle"
                  [class.cookie-toggle-on]="analyticsEnabled()"
                  role="switch"
                  [attr.aria-checked]="analyticsEnabled()"
                  [attr.aria-label]="t('cookie.analytics.title')"
                  (click)="toggleAnalytics()"
                >
                  <span class="cookie-toggle-dot"></span>
                </button>
              </div>
              <p class="cookie-category-desc">{{ t('cookie.analytics.desc') }}</p>
            </div>

            <div class="cookie-actions">
              <button type="button" class="cookie-btn cookie-btn-decline" (click)="consent.rejectAll()">
                {{ t('cookie.decline') }}
              </button>
              <button type="button" class="cookie-btn cookie-btn-manage" (click)="save()">
                {{ t('cookie.save') }}
              </button>
              <button type="button" class="cookie-btn cookie-btn-accept" (click)="consent.acceptAll()">
                {{ t('cookie.accept') }}
              </button>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      inset-inline: 1rem;
      bottom: 1rem;
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0 auto;
      max-width: 56rem;
      max-height: calc(100dvh - 2rem);
      overflow-y: auto;
      border-radius: 1rem;
      background: #0F172A;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.55);
    }

    .cookie-text {
      margin: 0;
      color: #E2E8F0;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .cookie-link {
      color: #C4B5FD;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .cookie-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .cookie-btn {
      border-radius: 9999px;
      padding: 0.55rem 1.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
    }

    .cookie-btn-decline,
    .cookie-btn-manage {
      background: transparent;
      color: #CBD5E1;
      border: 1px solid rgba(203, 213, 225, 0.35);
    }

    .cookie-btn-decline:hover,
    .cookie-btn-manage:hover {
      background: rgba(203, 213, 225, 0.1);
    }

    .cookie-btn-accept {
      background: #7C3AED;
      color: #ffffff;
    }

    .cookie-btn-accept:hover {
      background: #6D28D9;
    }

    .cookie-prefs-title {
      margin: 0;
      color: #F8FAFC;
      font-size: 1rem;
      font-weight: 800;
    }

    .cookie-prefs-desc {
      margin: 0.4rem 0 0;
      color: #CBD5E1;
      font-size: 0.82rem;
      line-height: 1.6;
    }

    .cookie-category {
      margin-top: 1rem;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      padding-top: 0.85rem;
    }

    .cookie-category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .cookie-category-name {
      color: #F1F5F9;
      font-size: 0.88rem;
      font-weight: 700;
    }

    .cookie-category-desc {
      margin: 0.35rem 0 0;
      color: #94A3B8;
      font-size: 0.78rem;
      line-height: 1.55;
    }

    .cookie-toggle {
      position: relative;
      flex-shrink: 0;
      width: 42px;
      height: 24px;
      border-radius: 9999px;
      background: rgba(148, 163, 184, 0.35);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: background-color 150ms ease;
    }

    .cookie-toggle-on {
      background: #7C3AED;
    }

    .cookie-toggle-locked {
      cursor: default;
      opacity: 0.7;
    }

    .cookie-toggle-dot {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      background: #ffffff;
      transition: transform 150ms ease;
    }

    .cookie-toggle-on .cookie-toggle-dot {
      transform: translateX(18px);
    }

    @media (min-width: 640px) {
      .cookie-banner-simple {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .cookie-banner-simple .cookie-actions {
        flex-shrink: 0;
      }
    }
  `]
})
export class CookieBannerComponent {
  protected readonly consent = inject(CookieConsentService);
  private readonly i18n = inject(I18nService);

  protected readonly analyticsEnabled = signal(false);

  constructor() {
    effect(() => {
      this.analyticsEnabled.set(this.consent.choices().analytics);
    });
  }

  protected toggleAnalytics(): void {
    this.analyticsEnabled.update((value) => !value);
  }

  protected save(): void {
    this.consent.savePreferences(this.analyticsEnabled());
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }
}
