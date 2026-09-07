import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-xoaila-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <!-- SEKCJA: Xoaila – opis produktu SaaS + lista punktów -->
    <section class="page-shell">
      <a class="logo-link" routerLink="/home" aria-label="Xoaila home">
        <span class="logo-word">xoaila</span>
        <span class="logo-mark" aria-hidden="true"></span>
      </a>

      <p>{{ t('xoaila.body') }}</p>

      <ul>
        <li *ngFor="let point of points">{{ t(point) }}</li>
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

      .logo-link {
        display: inline-flex;
        align-items: flex-end;
        gap: 0.25rem;
        flex-shrink: 0;
        text-decoration: none;
      }

      .logo-word {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 800;
        letter-spacing: -0.04em;
        line-height: 1;
        color: #284b63;
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

      .page-shell h1 {
        font-size: 2.25rem;
        font-weight: 800;
        color: #0F172A;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 68ch;
        color: #475569;
        line-height: 1.75;
      }

      .page-shell ul {
        margin-top: 1.4rem;
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
export class XoailaPageComponent {
  private readonly i18n = inject(I18nService);

  readonly points = ['xoaila.point1', 'xoaila.point2', 'xoaila.point3'];

  t(key: string): string {
    return this.i18n.t(key);
  }
}
