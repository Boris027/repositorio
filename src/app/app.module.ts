// src/app/app.module.ts
import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { PeopleService } from './core/services/impl/people.service';
import { PEOPLE_API_URL } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: PEOPLE_API_URL, useValue: 'https://randomuser.me/api/?results=100' },
    // Registrar los repositorios
    PeopleRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    },
    //el typerepository puede ser de cookiestorage o apistorage
    {provide:"typerepository",useValue:"cookiestorage"}
  ],
  // ... otros proveedores],
  bootstrap: [AppComponent],
})
export class AppModule {}
