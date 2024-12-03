import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage'
import { Angular4PaystackModule } from 'angular4-paystack';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    Angular4PaystackModule.forRoot('sk_test_1b0b3e4ed4efd106f77a37be6a79bd7ff744784c')
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'testdb',
      driverOrder: [Drivers.LocalStorage]
    }))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
