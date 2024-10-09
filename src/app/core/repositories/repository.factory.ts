// src/app/repositories/repository.factory.ts
import { FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Person } from '../models/person.model';
import { PEOPLE_API_URL, PEOPLE_REPOSITORY_TOKEN } from './repository.tokens';
import { BaseRepositoryCookieService } from './impl/base-repository-cookiestorage.service';
import { CookieService } from 'ngx-cookie-service';
// Importa otros modelos según sea necesario

export function createHttpRepository<T>(http: HttpClient, apiUrl: string): IBaseRepository<T> {
  return new BaseRepositoryHttpService<T>(http, apiUrl);
}

export function createcookiestorageRepository<T>(http: HttpClient, apiUrl: string,cookie:CookieService): IBaseRepository<T> {
  return new BaseRepositoryCookieService<T>(http, apiUrl,cookie);
}

// Ejemplo de configuración para People
export const PeopleRepositoryFactory: FactoryProvider = {
  provide: PEOPLE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string,typerepository:string,cookie:CookieService) => {
    // Aquí puedes decidir qué implementación usar
    // Por ejemplo, usar Firebase:
    
    switch(typerepository){
      case "cookiestorage":
        return createcookiestorageRepository<Person>(http, apiURL,cookie);
      case "apistorage":
        return createHttpRepository<Person>(http, apiURL);

      default:
        throw Error("No esta seleccionado un tipo de storage")  
    }

    
  },
  deps: [HttpClient, PEOPLE_API_URL,"typerepository",CookieService]
};

// Repite esto para otros modelos como Usuario, etc.
