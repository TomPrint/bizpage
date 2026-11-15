import { Component, OnDestroy, effect, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-xoaila-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <div class="bg-stripes" aria-hidden="true"><span></span><span></span></div>
    <div class="saas-shell">
      <section class="saas-card">
        <header class="saas-card-header">
          <a class="logo-link" [routerLink]="localizedPath('/')" aria-label="Xoaila home">
            <span class="logo-word">xoaila</span>
            <span class="logo-mark" aria-hidden="true"></span>
          </a>
          <p class="tagline">{{ t('xoaila.tagline') }}</p>
        </header>

        <p class="service-description">
          <span class="description-full">{{ t('xoaila.body') }}</span>
          <span class="description-mobile">{{ t('xoaila.bodyMobile') }}</span>
        </p>

        <ul>
          <li *ngFor="let point of points"><strong>{{ t(point + '.label') }}</strong> – {{ t(point) }}</li>
        </ul>

        <a class="service-button" href="https://xoaila.pl/">{{ t('midgrator.visit') }}</a>
      </section>

      <section class="saas-card">
        <header class="saas-card-header">
          <a class="logo-link mid-grator-link" href="https://midgrator.pl/">
            <img class="mid-grator-logo" src="/mid-grator-logo.jpg" alt="Mid-Grator" width="640" height="160">
          </a>
          <p class="tagline">{{ t('midgrator.tagline') }}</p>
        </header>

        <p class="service-description">
          <span class="description-full">{{ t('midgrator.body') }}</span>
          <span class="description-mobile">{{ t('midgrator.bodyMobile') }}</span>
        </p>

        <ul>
          <li *ngFor="let point of midgratorPoints"><strong>{{ t(point + '.label') }}</strong> – {{ t(point) }}</li>
        </ul>

        <a class="service-button" href="https://midgrator.pl/">{{ t('midgrator.visit') }}</a>
      </section>
    </div>
  `,
  styles: [
    `
      .saas-shell {
        margin: 0 auto;
        max-width: 72rem;
        padding: 3rem 1.5rem 6rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 1.5rem;
      }

      .saas-card {
        min-width: 0;
        border: 1px solid color-mix(in srgb, var(--card-copy, #334155) 15%, transparent);
        border-radius: 1.5rem;
        background: var(--card-background, #fff);
        padding: clamp(1.5rem, 4vw, 2.5rem);
        color: var(--card-copy, #334155);
        box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.35);
        transition: color 500ms ease, background-color 500ms ease, border-color 500ms ease;
      }

      .saas-card-header {
        margin-bottom: 1.25rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid color-mix(in srgb, currentColor 12%, transparent);
      }

      .logo-link {
        display: inline-flex;
        align-items: flex-end;
        gap: 0.25rem;
        flex-shrink: 0;
        text-decoration: none;
      }

      .mid-grator-logo {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
      }

      @media (max-width: 640px) {
        .logo-link {
          display: flex;
          width: max-content;
          max-width: 100%;
          margin-inline: auto;
        }
      }

      .mid-grator-link {
        width: min(100%, 10rem);
      }

      .logo-word {
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        line-height: 1;
        color: var(--xoaila-logo, #284b63);
      }

      .logo-mark {
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 9999px;
        background: #5ca197;
        margin-bottom: 0.3rem;
        flex-shrink: 0;
      }

      @media (max-width: 640px) {
        .logo-word {
          font-size: 2rem;
        }

        .logo-mark {
          width: 0.625rem;
          height: 0.625rem;
        }
      }

      .saas-card p {
        margin-top: 0.8rem;
        max-width: 68ch;
        line-height: 1.75;
      }

      .description-mobile {
        display: none;
      }

      @media (min-width: 641px) {
        .saas-card .service-description {
          max-width: none;
        }
      }

      @media (max-width: 640px) {
        .description-full {
          display: none;
        }

        .description-mobile {
          display: inline;
        }
      }

      .saas-card-header .tagline {
        margin-bottom: 0;
        font-weight: 600;
      }

      .service-button {
        display: inline-block;
        margin-top: 1.75rem;
        border: 0;
        border-radius: 0.625rem;
        background: #4F46E5;
        padding: 0.8rem 1.75rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        transition: background 150ms ease;
      }

      .service-button:hover {
        background: #4338CA;
      }

      .service-button:focus-visible {
        outline: 3px solid #818cf8;
        outline-offset: 3px;
      }

      .saas-card ul {
        margin-top: 1.4rem;
        display: grid;
        gap: 0.75rem;
        list-style: none;
        padding: 0;
      }

      .saas-card li {
        position: relative;
        padding-left: 1.5rem;
        font-weight: 500;
        line-height: 1.65;
      }

      .saas-card li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-text, #4F46E5);
        font-weight: 700;
      }

      @media (max-width: 640px) {
        .saas-card {
          text-align: center;
        }

        .saas-card p {
          margin-inline: auto;
        }

        .saas-card li {
          padding-left: 0;
        }

        .saas-card li::before {
          position: static;
          margin-right: 0.5rem;
        }

        .saas-card-header .logo-link {
          margin-inline: auto;
        }
      }
    `
  ]
})
export class XoailaPageComponent implements OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  readonly points = ['xoaila.point1', 'xoaila.point2', 'xoaila.point3'];
  readonly midgratorPoints = ['midgrator.point1', 'midgrator.point2', 'midgrator.point3'];

  constructor() {
    effect(() => {
      this.seo.updateTags({
        title: this.t('seo.saas.title'),
        description: this.t('seo.saas.description')
      });

      this.seo.setJsonLd('softwareapp', {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            inLanguage: this.i18n.locale(),
            name: 'Mid-Grator',
            url: 'https://midgrator.pl/',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: this.t('midgrator.body')
          },
          {
            '@type': 'SoftwareApplication',
            inLanguage: this.i18n.locale(),
            name: 'Xoaila',
            url: 'https://xoaila.pl/',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: this.t('xoaila.body')
          }
        ]
      });
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  localizedPath(path: string): string {
    return this.i18n.localizedPath(path);
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('softwareapp');
  }
}
