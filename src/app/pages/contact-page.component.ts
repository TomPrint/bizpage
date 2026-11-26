import { Component, OnDestroy, effect, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  template: `
    <div class="bg-stripes" aria-hidden="true"><span></span><span></span></div>
    <!-- SEKCJA: Kontakt – lekka, szybka wersja bez ciężkich grafik -->
    <section class="page-shell contact-shell">
      <div class="contact-card">
        <p class="eyebrow">{{ t('contact.title') }}</p>
        <h2 class="contact-heading">{{ t('contact.prompt') }}</h2>

        <div class="contact-actions">
        <a class="contact-email" href="mailto:kontakt@wickywave.pl">
          <svg
            class="contact-email-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span>kontakt&#64;wickywave.pl</span>
        </a>

        <a class="contact-email" href="tel:+48516551316">
          <svg class="contact-email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>516 551 316</span>
        </a>

        <a class="contact-email" href="tel:+48500083971">
          <svg class="contact-email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>500 083 971</span>
        </a>
        </div>

        <div class="social-details">
          <h3>{{ t('contact.socialMedia') }}</h3>
          <div class="social-links">
            <a class="contact-email" href="https://www.facebook.com/WickyWave/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg class="contact-email-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.25 0-1.64.78-1.64 1.57V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a class="contact-email" href="https://www.linkedin.com/company/wicky-wave-sp-z-o-o" target="_blank" rel="noopener noreferrer" [attr.aria-label]="t('contact.linkedin')">
              <svg class="contact-email-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.97V9.2h2.96v9.54ZM6.45 7.9a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.84h-2.96V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.5V9.2h2.84v1.3h.04a3.11 3.11 0 0 1 2.8-1.54c3 0 3.56 1.97 3.56 4.53v5.25Z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a class="contact-email" href="https://www.youtube.com/@WickyWave" target="_blank" rel="noopener noreferrer" [attr.aria-label]="t('contact.youtube')">
              <svg class="contact-email-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
              <span>YouTube</span>
            </a>
            <a class="contact-email" href="https://github.com/WickyWave" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg class="contact-email-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.48 3.18 1.77.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.3-2.62 5.25-5.11 5.52.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div class="company-details">
          <h3>{{ t('contact.companyDetails') }}</h3>
          <p>Wicky Wave Sp. z o.o.</p>
          <p>ul. Ezopa 57, 04-805 Warszawa</p>
          <p>{{ t('contact.taxId') }}: 9522290935</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .contact-shell {
      margin: 0 auto;
      max-width: 72rem;
      padding: 3rem 1.5rem 6rem;
    }

    .contact-card {
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 1.5rem;
      background: var(--card-background, #ffffff);
      padding: 2.25rem 1rem;
      text-align: center;
      box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.35);
      transition: background-color 300ms ease;
    }

    .eyebrow {
      margin: 0;
      color: var(--violet-text, #7C3AED);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .contact-heading {
      margin: 0.6rem auto 0;
      max-width: 32ch;
      font-size: clamp(1.35rem, 3.4vw, 2rem);
      font-weight: 800;
      line-height: 1.25;
      color: #0F172A;
      transition: color 300ms ease;
    }

    .contact-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.75rem;
      width: 100%;
      min-width: 0;
    }

    .contact-email {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      max-width: 100%;
      box-sizing: border-box;
      border-radius: 9999px;
      padding: 0.9rem 1.1rem;
      background: rgba(124, 58, 237, 0.1);
      color: var(--violet-text, #7C3AED);
      font-size: clamp(0.8rem, 4vw, 1.3rem);
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 180ms ease;
    }

    .contact-email:hover {
      background: rgba(124, 58, 237, 0.18);
    }

    .contact-email:focus {
      outline: none;
    }

    .contact-email:focus-visible {
      outline: 3px solid rgba(124, 58, 237, 0.45);
      outline-offset: 3px;
    }

    .contact-email-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .social-details {
      margin-top: 2rem;
    }

    .social-details h3 {
      margin: 0 0 0.75rem;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .social-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .company-details {
      margin: 2rem auto 0;
      padding-top: 1.5rem;
      border-top: 1px solid color-mix(in srgb, var(--card-copy, #475569) 22%, transparent);
      color: var(--card-copy, #475569);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .company-details h3 {
      margin: 0 0 0.5rem;
      color: #0F172A;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .company-details p {
      margin: 0.2rem 0;
    }

    @media (min-width: 768px) {
      .contact-actions {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
      }

      .contact-shell {
        padding: 4rem 1.5rem 7rem;
      }

      .contact-card {
        padding: 3.5rem 3rem;
      }

      .social-links {
        flex-direction: row;
        justify-content: center;
        gap: 2.5rem;
      }
    }
  `]
})
export class ContactPageComponent implements OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      this.seo.updateTags({
        title: this.t('seo.contact.title'),
        description: this.t('seo.contact.description')
      });

      this.seo.setJsonLd('contactpage', {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        inLanguage: this.i18n.locale(),
        name: this.t('seo.contact.title'),
        description: this.t('seo.contact.description')
      });
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('contactpage');
  }
}
