import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  template: `
    <!-- SEKCJA: O nas – opis firmy -->
    <section class="page-shell">
      <p>{{ t('about.body') }}</p>
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
        max-width: 65ch;
        color: #475569;
        line-height: 1.75;
      }
    `
  ]
})
export class AboutPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.about.title'),
      description: this.t('seo.about.description')
    });

    this.seo.setJsonLd('aboutpage', {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: this.t('seo.about.title'),
      description: this.t('seo.about.description')
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
