import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';
import { SeoService, SITE_URL } from '../seo.service';

@Component({
  selector: 'app-offer-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <!-- SEKCJA: Oferta – lead + lista usług -->
    <section class="page-shell">
      <p>{{ t('offer.lead') }}</p>
      <ul>
        <li *ngFor="let item of items">{{ t(item) }}</li>
      </ul>
    </section>
  `,
  styles: [
    `
      .page-shell {
        margin: 0 auto;
        max-width: 72rem;
        padding: 3rem 1.5rem 6rem;
      }

      .page-shell h1 {
        font-size: 2.25rem;
        font-weight: 800;
        color: #0F172A;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 55ch;
        color: #475569;
      }

      .page-shell ul {
        margin-top: 1.5rem;
        display: grid;
        gap: 0.75rem;
      }

      .page-shell li {
        border-radius: 0.75rem;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        padding: 0.9rem 1.1rem;
        font-weight: 500;
        color: #334155;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
    `
  ]
})
export class OfferPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  readonly items = ['offer.item1', 'offer.item2', 'offer.item3', 'offer.item4'];

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.offer.title'),
      description: this.t('seo.offer.description')
    });

    this.seo.setJsonLd('service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Custom software development',
      provider: { '@type': 'Organization', name: 'WickyWave Software', url: SITE_URL },
      description: this.t('seo.offer.description'),
      areaServed: 'PL'
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
