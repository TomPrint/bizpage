import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page.component';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NewsPageComponent } from './pages/news-page.component';
import { OfferPageComponent } from './pages/offer-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { XoailaPageComponent } from './pages/xoaila-page.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomePageComponent },
	{ path: 'aktywne-saas', component: XoailaPageComponent },
	{ path: 'offer', component: OfferPageComponent },
	{ path: 'about-us', component: AboutPageComponent },
	{ path: 'news', component: NewsPageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: 'privacy-policy', component: PrivacyPageComponent },
	{ path: '**', redirectTo: 'home' }
];
