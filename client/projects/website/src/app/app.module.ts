import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, Injector, NgModule, PLATFORM_ID} from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TrackByFieldModule} from '@jaspero/ng-helpers';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsPageModule} from './modules/news-page/news-page.module';
import {appInit} from './shared/helpers/app-init';
import {ApiInterceptorService} from './shared/services/api-interceptor/api-interceptor.service';
import {SharedModule} from './shared/shared.module';

/**
 * Additional initial setup can be added
 * by adding attributes here and to the deps
 * in the provider. The return value needs
 * to be switched to Promise.all
 */
export function init(injector: Injector) {
  return () => {
    const pId = injector.get(PLATFORM_ID);
    return appInit(pId);
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule.withServerTransition({
      appId: 'jaspero-universal'
    }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NewsPageModule,
    TransferHttpCacheModule,

    // External
    SimpleNotificationsModule.forRoot({
      timeOut: 10000
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.loadServiceWorker
    }),
    TrackByFieldModule.defaultKey('_id')
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ApiInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
