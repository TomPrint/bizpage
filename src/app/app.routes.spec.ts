import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';

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

  it('uses a privacy-specific title and canonical URL', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/privacy-policy', PrivacyPageComponent);

    expect(TestBed.inject(Title).getTitle()).toContain('Polityka prywatności');
    expect(TestBed.inject(Title).getTitle()).not.toContain('dedykowane aplikacje webowe');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href)
      .toBe('https://wickywave.pl/privacy-policy');
  });
});
