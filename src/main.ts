import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// TODO: Use standalone instead of app.module.ts, plizz sisi
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';
// import { IonicRouteStrategy } from '@ionic/angular';

// bootstrapApplication(AppComponent, {
//   providers: [ 
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     importProvidersFrom(
    
//       HttpClient,
//       HttpClientModule,
//       ...
//   ],
// });