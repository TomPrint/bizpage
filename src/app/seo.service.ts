import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

/** Publiczny adres produkcyjny strony – używany do canonical, Open Graph i JSON-LD. */
export const SITE_URL = 'https://wickywave.pl';
export const SITE_NAME = 'WickyWave Software';

export interface SeoTags {
  title: string;
  description: string;
  /** Opcjonalna ścieżka do obrazu OG/Twitter (względem SITE_URL). */
  image?: string;
  /** Opcjonalne wymuszenie ścieżki canonical (np. '/' dla strony głównej zamiast '/home'). */
  canonicalPath?: string;
}

/**
 * Centralny serwis SEO: ustawia <title>, meta description, Open Graph/Twitter Cards,
 * canonical URL (wyliczany z aktualnej trasy routera) oraz wstrzykuje znaczniki JSON-LD.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  updateTags(tags: SeoTags): void {
    const canonicalUrl = tags.canonicalPath
      ? this.buildUrl(tags.canonicalPath)
      : this.canonicalUrl();

    this.title.setTitle(tags.title);

    this.meta.updateTag({ name: 'description', content: tags.description });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });

    if (tags.image) {
      const imageUrl = `${SITE_URL}${tags.image}`;
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    }

    this.setCanonicalLink(canonicalUrl);
  }

  /** Wstrzykuje (lub podmienia) blok JSON-LD o podanym id w <head>. */
  setJsonLd(id: string, data: Record<string, unknown>): void {
    const scriptId = `jsonld-${id}`;
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  private canonicalUrl(): string {
    const path = this.router.url.split('?')[0].split('#')[0];
    return this.buildUrl(path);
  }

  private buildUrl(path: string): string {
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  }

  private setCanonicalLink(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
