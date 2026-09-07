import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  template: `
    <!-- SEKCJA: Polityka prywatności – zgodna z RODO/UE -->
    <section class="page-shell privacy-shell">
      <p class="eyebrow">{{ t('privacy.updated') }}</p>
      <h1 class="privacy-title">{{ t('privacy.title') }}</h1>
      <p class="privacy-intro">{{ t('privacy.intro') }}</p>

      <div class="privacy-section">
        <h2>{{ t('privacy.section1.title') }}</h2>
        <p>{{ t('privacy.section1.body') }}</p>
      </div>

      <div class="privacy-section">
        <h2>{{ t('privacy.section2.title') }}</h2>
        <p>{{ t('privacy.section2.body') }}</p>
      </div>

      <div class="privacy-section">
        <h2>{{ t('privacy.section3.title') }}</h2>
        <p>{{ t('privacy.section3.body') }}</p>
      </div>

      <div class="privacy-section">
        <h2>{{ t('privacy.section4.title') }}</h2>
        <p>{{ t('privacy.section4.body') }}</p>
      </div>

      <div class="privacy-section">
        <h2>{{ t('privacy.section5.title') }}</h2>
        <p>{{ t('privacy.section5.body') }}</p>
      </div>

      <div class="privacy-section">
        <h2>{{ t('privacy.section6.title') }}</h2>
        <p>{{ t('privacy.section6.body') }}</p>
      </div>
    </section>
  `,
  styles: [`
    .privacy-shell {
      margin: 0 auto;
      max-width: 60rem;
      padding: 3rem 1.5rem 6rem;
    }

    .eyebrow {
      margin: 0;
      color: #7C3AED;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .privacy-title {
      margin: 0.6rem 0 0;
      font-size: clamp(1.7rem, 4vw, 2.4rem);
      font-weight: 800;
      color: #0F172A;
    }

    .privacy-intro {
      margin-top: 1rem;
      max-width: 65ch;
      color: #475569;
      line-height: 1.75;
    }

    .privacy-section {
      margin-top: 2rem;
    }

    .privacy-section h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0F172A;
    }

    .privacy-section p {
      margin-top: 0.5rem;
      max-width: 65ch;
      color: #475569;
      line-height: 1.75;
    }
  `]
})
export class PrivacyPageComponent {
  private readonly i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
