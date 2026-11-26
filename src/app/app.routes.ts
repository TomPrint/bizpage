import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { I18nService } from './i18n/i18n.service';
import { Locale } from './i18n/translations';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { XoailaPageComponent } from './pages/xoaila-page.component';

const setRouteLocale = (locale: Locale): CanActivateFn => () => {
  inject(I18nService).setLocale(locale);
  return true;
};

const publishedRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'aktywne-saas', component: XoailaPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'privacy-policy', component: PrivacyPageComponent }
];

export const routes: Routes = [
  {
    path: 'admin-login',
    loadComponent: () => import('./pages/admin-page.component').then(m => m.AdminPageComponent)
  },
  ...(['pl', 'en', 'de'] as const).flatMap(locale =>
    publishedRoutes.map(route => ({
      ...route,
      path: locale === 'pl' ? route.path : [locale, route.path].filter(Boolean).join('/'),
      canActivate: [setRouteLocale(locale)]
    }))
  ),
  { path: 'en', children: [{ path: '**', component: NotFoundPageComponent, canActivate: [setRouteLocale('en')] }] },
  { path: 'de', children: [{ path: '**', component: NotFoundPageComponent, canActivate: [setRouteLocale('de')] }] },
  { path: '**', component: NotFoundPageComponent }
];
