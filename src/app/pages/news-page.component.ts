import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { SeoService, SITE_URL } from '../seo.service';

@Component({
  selector: 'app-news-page',
  standalone: true,
  template: `
    <!-- SEKCJA: News – lead + siatka 3 kart artykułów -->
    <section class="page-shell">
      <p>{{ t('news.body') }}</p>
      <div class="news-grid">
        <article>{{ t('news.card1') }}</article>
        <article>{{ t('news.card2') }}</article>
        <article>{{ t('news.card3') }}</article>
      </div>
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
        color: #475569;
      }

      .news-grid {
        margin-top: 1.5rem;
        display: grid;
        gap: 1rem;
      }

      .news-grid article {
        border-radius: 0.75rem;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        padding: 1.25rem;
        font-weight: 500;
        color: #334155;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }

      @media (min-width: 768px) {
        .news-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `
  ]
})
export class NewsPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.news.title'),
      description: this.t('seo.news.description')
    });

    this.seo.setJsonLd('newspage', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: this.t('seo.news.title'),
      description: this.t('seo.news.description'),
      url: `${SITE_URL}/news`,
      hasPart: [
        { '@type': 'Article', headline: this.t('news.card1') },
        { '@type': 'Article', headline: this.t('news.card2') },
        { '@type': 'Article', headline: this.t('news.card3') }
      ]
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
