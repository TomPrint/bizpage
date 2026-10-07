import { Component, inject } from '@angular/core';
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

        <a class="contact-email" href="mailto:hello@wickywave.wicky">
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
          <span>hello&#64;wickywave.wicky</span>
        </a>

        <p class="contact-note">{{ t('contact.reply') }}</p>
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
      border-radius: 1.5rem;
      background: #ffffff;
      padding: 2.25rem 1.5rem;
      text-align: center;
      box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.35);
      transition: background-color 300ms ease;
    }

    .eyebrow {
      margin: 0;
      color: #7C3AED;
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

    .contact-email {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 1.75rem;
      max-width: 100%;
      border-radius: 9999px;
      padding: 0.9rem 1.1rem;
      background: rgba(124, 58, 237, 0.1);
      color: #7C3AED;
      font-size: clamp(0.85rem, 4.6vw, 1.3rem);
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 180ms ease, transform 150ms ease;
    }

    .contact-email:hover {
      background: rgba(124, 58, 237, 0.18);
      transform: translateY(-1px);
    }

    .contact-email-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .contact-note {
      margin: 1.25rem auto 0;
      max-width: 40ch;
      font-size: 0.9rem;
      color: #475569;
      transition: color 300ms ease;
    }

    @media (min-width: 768px) {
      .contact-shell {
        padding: 4rem 1.5rem 7rem;
      }

      .contact-card {
        padding: 3.5rem 3rem;
      }
    }
  `]
})
export class ContactPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.contact.title'),
      description: this.t('seo.contact.description')
    });

    this.seo.setJsonLd('contactpage', {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: this.t('seo.contact.title'),
      description: this.t('seo.contact.description')
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
