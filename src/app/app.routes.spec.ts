import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { XoailaPageComponent } from './pages/xoaila-page.component';
import { I18nService } from './i18n/i18n.service';
import { translations } from './i18n/translations';
import { germanTranslations } from './i18n/translations.de';
import { AdminService } from './admin/admin.service';

describe('Published routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('shows the LinkedIn link on the contact page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contact', ContactPageComponent);
    const link = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('a[href="https://www.linkedin.com/company/wicky-wave-sp-z-o-o"]');
    expect(link).toBeTruthy();
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toContain('noopener');
    expect(link?.querySelector('svg')).toBeTruthy();
  });

  it('shows the YouTube link on the contact page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contact', ContactPageComponent);
    const link = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('a[href="https://www.youtube.com/@WickyWave"]');
    expect(link).toBeTruthy();
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toContain('noopener');
    expect(link?.querySelector('svg')).toBeTruthy();
  });

  it('provides German translations for every translation key', () => {
    expect(Object.keys(germanTranslations).sort()).toEqual(Object.keys(translations).sort());
    expect(Object.values(germanTranslations).every(value => value.trim().length > 0)).toBeTrue();
  });

  it('updates page content and SEO when switching to German', async () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomePageComponent);
    i18n.setLocale('de');
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain('Wir entwickeln Webanwendungen');
    expect(TestBed.inject(Title).getTitle()).toContain('individuelle Webanwendungen');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toContain('Wir entwickeln');
    await harness.navigateByUrl('/de/aktywne-saas', XoailaPageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('ZUM SERVICE');
    expect(harness.routeNativeElement?.textContent).toContain('SERVICESTART IN KÜRZE');
    await harness.navigateByUrl('/de/privacy-policy', PrivacyPageComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Datenschutzerklärung');
    expect(harness.routeNativeElement?.textContent).toContain('Google Consent Mode v2');
    expect(TestBed.inject(Title).getTitle()).toContain('Datenschutzerklärung');
  });

  it('uses localized canonical, alternate links, keywords and JSON-LD', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);
    for (const [prefix, locale, keyword] of [
      ['', 'pl', 'tworzenie oprogramowania'],
      ['/en', 'en', 'software development'],
      ['/de', 'de', 'Softwareentwicklung']
    ]) {
      await harness.navigateByUrl(prefix || '/', HomePageComponent);
      expect(document.documentElement.lang).toBe(locale);
      expect(meta.getTag('name="keywords"')?.content).toContain(keyword);
      expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href)
        .toBe(`https://wickywave.pl${prefix || '/'}`);
      expect(document.querySelector<HTMLLinkElement>('link[hreflang="de"]')?.href)
        .toBe('https://wickywave.pl/de');
      const breadcrumb = JSON.parse(document.getElementById('jsonld-breadcrumb')!.textContent!);
      expect(breadcrumb.inLanguage).toBe(locale);
      expect(breadcrumb.itemListElement[0].item).toBe(`https://wickywave.pl${prefix || '/'}`);
    }

    await harness.navigateByUrl('/de/aktywne-saas', XoailaPageComponent);
    expect(document.getElementById('jsonld-breadcrumb')).toBeNull();
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href)
      .toBe('https://wickywave.pl/de/aktywne-saas');
    expect(document.querySelector<HTMLLinkElement>('link[hreflang="en"]')?.href)
      .toBe('https://wickywave.pl/en/aktywne-saas');
    const software = JSON.parse(document.getElementById('jsonld-softwareapp')!.textContent!);
    expect(software['@graph'][0].inLanguage).toBe('de');
    expect(software['@graph'][0].description).toContain('Großhändlern');
    await harness.navigateByUrl('/de/privacy-policy', PrivacyPageComponent);
    expect(document.getElementById('jsonld-softwareapp')).toBeNull();
  });

  it('shows 404 for removed and unknown routes and restores robots on navigation', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);
    meta.updateTag({ name: 'robots', content: 'index, follow' });

    for (const path of ['/offer', '/about-us', '/news', '/missing-page']) {
      await harness.navigateByUrl(path, NotFoundPageComponent);
      expect(harness.routeNativeElement?.textContent).toContain('404');
      expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
    }

    await harness.navigateByUrl('/', HomePageComponent);
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
  });

  it('excludes the admin route from indexing and restores robots on leaving', async () => {
    const admin = jasmine.createSpyObj<AdminService>('AdminService', ['initialize']);
    admin.initialize.and.callFake(callback => {
      callback(null);
      return () => {};
    });
    TestBed.overrideProvider(AdminService, { useValue: admin });
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);
    await harness.navigateByUrl('/admin-login');
    expect(harness.routeNativeElement?.textContent).toContain('Panel administracyjny');
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, nofollow, noarchive');
    await harness.navigateByUrl('/', HomePageComponent);
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
  });

  it('sets the homepage canonical and keywords, then clears homepage keywords on other pages', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);

    await harness.navigateByUrl('/', HomePageComponent);
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://wickywave.pl/');
    expect(meta.getTag('name="keywords"')?.content).toContain('tworzenie oprogramowania');

    await harness.navigateByUrl('/contact', ContactPageComponent);
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://wickywave.pl/contact');
    expect(meta.getTag('name="keywords"')).toBeNull();
  });

  it('links from the homepage SaaS tab and CTA footer to the product page in both languages', async () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomePageComponent);

    const tab = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('a.saas-tab')!;
    const cta = harness.routeNativeElement!.querySelector<HTMLElement>('.cta-block')!;
    const bannerSection = cta.querySelector<HTMLElement>('.saas-banner-section')!;
    const banner = bannerSection.querySelector<HTMLAnchorElement>('a.saas-banner')!;
    expect(cta.lastElementChild).toBe(bannerSection);
    expect(bannerSection.tagName).toBe('FOOTER');
    expect(bannerSection.classList.contains('lg:hidden')).toBeTrue();
    for (const link of [tab, banner]) {
      expect(link.getAttribute('href')).toBe('/aktywne-saas');
      expect(link.textContent).toContain('Nasze produkty SaaS');
      expect(link.textContent).toContain('Kliknij i sprawdź');
      expect(link.textContent).not.toContain('→');
    }
    expect(banner.textContent).toContain('Poznaj nasze gotowe aplikacje');
    i18n.setLocale('en');
    harness.detectChanges();
    for (const link of [tab, banner]) {
      expect(link.textContent).toContain('Our SaaS products');
      expect(link.textContent).toContain('Click to explore');
      expect(link.textContent).not.toContain('→');
    }
    expect(banner.textContent).toContain('Discover our ready-made applications');

    banner.click();
    await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.querySelectorAll('.saas-card').length).toBe(2);
  });

  it('uses a privacy-specific title and canonical URL', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/privacy-policy', PrivacyPageComponent);

    expect(TestBed.inject(Title).getTitle()).toContain('Polityka prywatności');
    expect(TestBed.inject(Title).getTitle()).not.toContain('dedykowane aplikacje webowe');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href)
      .toBe('https://wickywave.pl/privacy-policy');
  });

  it('shows Xoaila before Mid-Grator in both languages', async () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/aktywne-saas', XoailaPageComponent);

    const sections = harness.routeNativeElement!.querySelectorAll('section');
    expect(sections.length).toBe(2);
    expect(sections[0].classList.contains('saas-card')).toBeTrue();
    expect(sections[1].classList.contains('saas-card')).toBeTrue();
    expect(sections[0].firstElementChild?.tagName).toBe('HEADER');
    expect(sections[1].firstElementChild?.tagName).toBe('HEADER');
    expect(sections[0].textContent).toContain('xoaila');
    const xoailaVisit = sections[0].querySelector<HTMLAnchorElement>('a.service-button');
    expect(xoailaVisit?.href).toBe('https://xoaila.pl/');
    expect(xoailaVisit?.textContent?.trim()).toBe('PRZEJDŹ DO SERWISU');
    expect(sections[0].lastElementChild).toBe(xoailaVisit);
    const link = sections[1].querySelector<HTMLAnchorElement>('.saas-card-header a');
    expect(link?.href).toBe('https://midgrator.pl/');
    expect(link?.querySelector('img')?.getAttribute('src')).toBe('/mid-grator-logo.jpg');
    expect(link?.querySelector('img')?.alt).toBe('Mid-Grator');
    expect(sections[1].textContent).toContain('Mid-Grator to usługa SaaS');
    expect(sections[1].querySelectorAll('li').length).toBe(3);
    const visit = sections[1].querySelector<HTMLAnchorElement>('a.service-button');
    expect(visit?.href).toBe('https://midgrator.pl/');
    expect(visit?.textContent?.trim()).toBe('PRZEJDŹ DO SERWISU');
    expect(sections[1].lastElementChild).toBe(visit);
    expect(sections[0].textContent).not.toContain('Usługa będzie dostępna wkrótce.');
    expect(TestBed.inject(Title).getTitle()).toContain('Mid-Grator');

    i18n.setLocale('en');
    harness.detectChanges();
    expect(sections[1].textContent).toContain('Mid-Grator is a SaaS service');
    expect(visit?.textContent?.trim()).toBe('VISIT THE SERVICE');
    expect(xoailaVisit?.textContent?.trim()).toBe('VISIT THE SERVICE');
  });
});
