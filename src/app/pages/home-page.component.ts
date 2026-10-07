import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChildren
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';
import { SeoService, SITE_NAME, SITE_URL } from '../seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <!-- TŁO: długi skośny pas rysowany wraz ze scrollem (style w styles.css) -->
    <div class="bg-stripes" aria-hidden="true"><span></span><span></span></div>

    <!-- SEKCJA: Hero – główny nagłówek z CTA -->
    <section class="mx-auto max-w-6xl px-6 pt-10 pb-14 md:px-10 md:pt-16">
      <p class="eyebrow">{{ t('home.eyebrow') }}</p>
      <h1 class="theme-heading hero-title">{{ t('home.title') }}</h1>
      <p class="theme-copy hero-lead">{{ t('home.subtitle') }}</p>
      <a routerLink="/contact" class="hero-cta">{{ t('home.hero.cta') }}</a>
    </section>

    <!-- SEKCJA: Problemy – czy któryś brzmi znajomo? -->
    <section class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <h2
        #slideTitle
        class="theme-heading section-title slide-title"
        [attr.aria-label]="t('home.problems.title')"
      >
        <span
          *ngFor="let word of headingWords('home.problems.title'); let wordIndex = index"
          class="animated-word"
          aria-hidden="true"
        ><span
          *ngFor="let char of wordCharacters(word); let i = index"
          class="slide-char"
          [style.--char-index]="wordIndex * 12 + i"
        >{{ char }}</span></span>{{ ' ' }}
      </h2>
      <ul class="check-list mt-5">
        <li *ngFor="let item of problemItems">{{ t(item) }}</li>
      </ul>
      <p class="theme-copy closing-note mt-5">{{ t('home.problems.closing') }}</p>
    </section>

    <!-- SEKCJA: Usługi – co robimy -->
    <section id="uslugi" class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <h2 class="theme-heading section-title">{{ t('home.services.title') }}</h2>
      <p class="theme-copy section-lead">{{ t('home.services.lead') }}</p>
      <p class="section-sublabel">{{ t('home.services.sublabel') }}</p>
      <ul class="services-list mt-3">
        <li *ngFor="let item of serviceItems">{{ t(item) }}</li>
      </ul>
    </section>

    <!-- SEKCJA: Kiedy gotowe systemy przestają wystarczyć -->
    <section class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <h2
        #slideTitle
        class="theme-heading section-title slide-title"
        [attr.aria-label]="t('home.why.title')"
      >
        <span
          *ngFor="let word of headingWords('home.why.title'); let wordIndex = index"
          class="animated-word"
          aria-hidden="true"
        ><span
          *ngFor="let char of wordCharacters(word); let i = index"
          class="slide-char"
          [style.--char-index]="wordIndex * 12 + i"
        >{{ char }}</span></span>{{ ' ' }}
      </h2>
      <p class="theme-copy section-lead">{{ t('home.why.lead') }}</p>
      <ul class="dash-list mt-4">
        <li *ngFor="let item of whyItems">{{ t(item) }}</li>
      </ul>
      <p class="theme-copy closing-note mt-5">{{ t('home.why.closing') }}</p>
    </section>

    <!-- SEKCJA: Technologie -->
    <section class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <h2 class="theme-heading section-title">{{ t('home.tech.title') }}</h2>
      <p class="section-sublabel">{{ t('home.tech.sublabel') }}</p>
      <div class="tech-grid mt-4">
        <span *ngFor="let tech of techItems" class="tech-badge">{{ tech }}</span>
      </div>
      <p class="theme-copy closing-note mt-5">{{ t('home.tech.closing') }}</p>
    </section>

    <!-- SEKCJA: Jak pracujemy – 4 kroki -->
    <section class="mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <div class="process-block">
        <h2 class="process-title">{{ t('home.process.title') }}</h2>
        <div class="process-grid">
          <div *ngFor="let step of processSteps; let i = index" class="process-step">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ t(step.title) }}</h3>
              <p class="step-body">{{ t(step.body) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEKCJA: Dlaczego WickyWave -->
    <section class="mx-auto max-w-6xl px-6 pb-14 md:px-10">
      <h2
        #slideTitle
        class="theme-heading section-title slide-title"
        [attr.aria-label]="t('home.whyus.title')"
      >
        <span
          *ngFor="let word of headingWords('home.whyus.title'); let wordIndex = index"
          class="animated-word"
          aria-hidden="true"
        ><span
          *ngFor="let char of wordCharacters(word); let i = index"
          class="slide-char"
          [style.--char-index]="wordIndex * 12 + i"
        >{{ char }}</span></span>{{ ' ' }}
      </h2>
      <p class="theme-copy section-lead">{{ t('home.whyus.lead') }}</p>
      <ul class="check-list mt-5">
        <li *ngFor="let item of whyusItems">{{ t(item) }}</li>
      </ul>
    </section>

    <!-- SEKCJA: CTA końcowe -->
    <section class="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div class="cta-block">
        <h2 class="cta-title">{{ t('home.cta.title') }}</h2>
        <p class="cta-body">{{ t('home.cta.body') }}</p>
        <a routerLink="/contact" class="cta-btn">{{ t('home.cta.btn') }}</a>
      </div>
    </section>
  `,
  styles: [`
    /* ── HERO ──────────────────────────────────────────────── */
    .eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #4F46E5;
    }
    .hero-title {
      margin-top: 1rem;
      max-width: 52rem;
      font-size: clamp(1.75rem, 4vw, 2.625rem);
      font-weight: 800;
      line-height: 1.2;
    }
    .hero-lead {
      margin-top: 1.25rem;
      max-width: 62ch;
      font-size: 1.0625rem;
      line-height: 1.8;
    }
    .hero-cta {
      display: inline-block;
      margin-top: 2rem;
      border-radius: 0.625rem;
      background: #4F46E5;
      padding: 0.8rem 1.75rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .hero-cta:hover { background: #4338CA; }

    /* ── WSPÓLNE ────────────────────────────────────────────── */
    .section-title {
      font-size: clamp(1.3rem, 3vw, 1.875rem);
      font-weight: 800;
      line-height: 1.25;
    }
    .slide-title {
      overflow: hidden;
    }
    .animated-word {
      display: inline-block;
      white-space: nowrap;
      margin-right: 0.28em;
    }
    .slide-char {
      display: inline-block;
      white-space: pre;
    }
    .slide-title.is-slide-ready .slide-char {
      opacity: 0;
      transform: translateX(-300%) skewX(20deg);
      transition:
        opacity 220ms ease,
        transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
      transition-delay: calc(var(--char-index) * 18ms);
      will-change: opacity, transform;
    }
    .slide-title.is-slide-ready.is-visible .slide-char {
      opacity: 1;
      transform: translateX(0) skewX(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .slide-title.is-slide-ready .slide-char {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
    .section-lead {
      margin-top: 0.75rem;
      max-width: 65ch;
      font-size: 1rem;
      line-height: 1.75;
    }
    .section-sublabel {
      margin-top: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--page-copy, #64748B);
    }
    .closing-note {
      max-width: 70ch;
      font-size: 0.9375rem;
      line-height: 1.8;
      font-style: italic;
    }

    /* ── LISTY ─────────────────────────────────────────────── */
    .dash-list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.5rem;
    }
    .dash-list li {
      padding-left: 1.5rem;
      position: relative;
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--page-copy, #475569);
    }
    .dash-list li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #4F46E5;
      font-weight: 700;
    }

    /* Ptaszek – problemy klienta, przewagi WickyWave */
    .check-list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.5rem;
    }
    .check-list li {
      padding-left: 1.75rem;
      position: relative;
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--page-copy, #475569);
    }
    .check-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #4F46E5;
      font-weight: 700;
    }

    /* Strzalka – lista uslug */
    .services-list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.5rem;
    }
    @media (min-width: 640px) {
      .services-list { grid-template-columns: repeat(2, 1fr); }
    }
    .services-list li {
      padding: 0.7rem 1rem 0.7rem 2.25rem;
      position: relative;
      font-size: 0.9375rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: 1px solid color-mix(in srgb, var(--card-copy, #334155) 15%, transparent);
      background: var(--card-background, #FFFFFF);
      color: var(--card-copy, #334155);
      transition: background 150ms ease, border-color 150ms ease;
    }
    .services-list li::before {
      content: '→';
      position: absolute;
      left: 0.8rem;
      color: #4F46E5;
    }

    /* ── TECHNOLOGIE ───────────────────────────────────────── */
    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tech-badge {
      overflow: hidden;
      border-radius: 9999px;
      background: #EEF2FF;
      color: #4F46E5;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.35rem 0.9rem;
    }

    /* ── PROCESS ────────────────────────────────────────────── */
    .process-block {
      border-radius: 1.25rem;
      background: #0F172A;
      padding: 2.5rem 2rem;
    }
    @media (min-width: 768px) {
      .process-block { padding: 3rem 3.5rem; }
    }
    .process-title {
      font-size: clamp(1.3rem, 3vw, 1.875rem);
      font-weight: 800;
      color: #F1F5F9;
    }
    .process-grid {
      margin-top: 2rem;
      display: grid;
      gap: 1.75rem;
    }
    @media (min-width: 768px) {
      .process-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .process-step {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .step-num {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: #4F46E5;
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-title {
      font-size: 1rem;
      font-weight: 700;
      color: #E2E8F0;
    }
    .step-body {
      margin-top: 0.35rem;
      font-size: 0.9rem;
      color: #94A3B8;
      line-height: 1.65;
    }

    /* ── CTA BLOK ───────────────────────────────────────────── */
    .cta-block {
      border-radius: 1.25rem;
      background: linear-gradient(135deg, #4F46E5 0%, #3730A3 100%);
      padding: 2.5rem 2rem;
      text-align: center;
    }
    @media (min-width: 768px) {
      .cta-block { padding: 3.5rem; }
    }
    .cta-title {
      font-size: clamp(1.3rem, 3vw, 1.875rem);
      font-weight: 800;
      color: #fff;
    }
    .cta-body {
      margin-top: 0.75rem;
      max-width: 55ch;
      margin-inline: auto;
      font-size: 0.9625rem;
      color: rgba(255, 255, 255, 0.82);
      line-height: 1.75;
    }
    .cta-btn {
      display: inline-block;
      margin-top: 1.75rem;
      border-radius: 0.625rem;
      background: #fff;
      padding: 0.8rem 1.75rem;
      font-size: 0.95rem;
      font-weight: 700;
      color: #4F46E5;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .cta-btn:hover { background: #EEF2FF; }
  `]
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private slideObserver?: IntersectionObserver;

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.home.title'),
      description: this.t('seo.home.description'),
      canonicalPath: '/'
    });

    this.seo.setJsonLd('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` }]
    });
  }

  @ViewChildren('slideTitle', { read: ElementRef })
  private readonly animatedTitles!: QueryList<ElementRef<HTMLElement>>;

  readonly problemItems = [
    'home.problems.item1', 'home.problems.item2', 'home.problems.item3',
    'home.problems.item4', 'home.problems.item5'
  ];

  readonly serviceItems = [
    'home.services.item1', 'home.services.item2', 'home.services.item3',
    'home.services.item4', 'home.services.item5', 'home.services.item6',
    'home.services.item7', 'home.services.item8'
  ];

  readonly whyItems = [
    'home.why.item1', 'home.why.item2', 'home.why.item3', 'home.why.item4'
  ];

  readonly techItems = [
    'Django', 'Angular', 'Python', 'REST API',
    'Machine Learning / AI', 'IoT – integracje sprzętowe'
  ];

  readonly processSteps = [
    { title: 'home.process.step1.title', body: 'home.process.step1.body' },
    { title: 'home.process.step2.title', body: 'home.process.step2.body' },
    { title: 'home.process.step3.title', body: 'home.process.step3.body' },
    { title: 'home.process.step4.title', body: 'home.process.step4.body' },
  ];

  readonly whyusItems = [
    'home.whyus.item1', 'home.whyus.item2', 'home.whyus.item3',
    'home.whyus.item4', 'home.whyus.item5'
  ];

  t(key: string): string {
    return this.i18n.t(key);
  }

  headingWords(key: string): string[] {
    const words = this.t(key).trim().split(/\s+/);
    const groups: string[] = [];

    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      const isShortConnector = /^[aAiIoOuUwWzZ]$/.test(word);

      if (isShortConnector && index < words.length - 1) {
        groups.push(`${word}\u00A0${words[index + 1]}`);
        index++;
      } else {
        groups.push(word);
      }
    }

    return groups;
  }

  wordCharacters(word: string): string[] {
    return Array.from(word);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.slideObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    for (const title of this.animatedTitles) {
      const element = title.nativeElement;
      element.classList.add('is-slide-ready');
      this.slideObserver.observe(title.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.slideObserver?.disconnect();
  }
}
