import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'gamesjuanbarraza',
          appId: '1:636037566370:web:c4fd0e6c82d7eef2f8acfb',
          storageBucket: 'gamesjuanbarraza.appspot.com',
          apiKey: 'AIzaSyD5I1v6PeAjpMM-q4HCXN6FYPIX8Mr_mBE',
          authDomain: 'gamesjuanbarraza.firebaseapp.com',
          messagingSenderId: '636037566370',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(BrowserAnimationsModule),
  ],
});
