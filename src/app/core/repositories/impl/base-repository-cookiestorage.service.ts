// src/app/repositories/impl/base-repository-http.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBaseRepository } from '../intefaces/base-repository.interface';
import { PEOPLE_API_URL } from '../repository.tokens';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class BaseRepositoryCookieService<T> implements IBaseRepository<T> {

  protected apiUrl:string='';
  constructor(
    
    protected http: HttpClient,
    @Inject(PEOPLE_API_URL) apiUrl: string, // URL base de la API para el modelo
    protected cookie:CookieService,
  
  ) {
    this.apiUrl = apiUrl;
    
    let cookiedata=cookie.get('data')

    if(cookiedata==""){
      cookie.set('data',JSON.stringify(this.users))
    }else{
      console.log(cookiedata)
      this.datasubject.next(JSON.parse(cookiedata))
    }

    

    

  }

  private datasubject:BehaviorSubject<T[]> =new BehaviorSubject<T[]>([])

  getAll(): Observable<T[]> {
    return this.datasubject.asObservable()
  }

  getById(id: string): Observable<T | null> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  add(entity: T): Observable<string> {
    return new Observable<string>(observer => {
      this.http.post<T>(`${this.apiUrl}`, entity).subscribe({
        next: (response: any) => {
          observer.next(response.id); // Asume que la API retorna el ID del nuevo recurso
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  update(id: string, entity: T): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


   users:any ={results:[
    {
        gender: "female",
        name: { title: "Mrs", first: "Sharanya", last: "Holla" },
        location: {
            street: { number: 9071, name: "Lamington Rd" },
            city: "Bellary",
            state: "Kerala",
            country: "India",
            postcode: 31515,
            coordinates: { latitude: "6.3834", longitude: "21.9407" },
            timezone: { offset: "-5:00", description: "Eastern Time (US & Canada), Bogota, Lima" }
        },
        email: "sharanya.holla@example.com",
        login: {
            uuid: "b574e617-3cf9-4a2e-a407-aae25fcd7d33",
            username: "heavyostrich705",
            password: "336699",
            salt: "W8KOk3xt",
            md5: "5c54a60d997c5ecc9110f5624aabfc8d",
            sha1: "a9d54edd6e22e4de956def9f92b052609800ed74",
            sha256: "39e28af3ee6e1ad5a5ed2bb291697529ffb12261a10767afa9431b0a9ff2df17"
        },
        dob: { date: "1996-10-24T17:47:40.391Z", age: 27 },
        registered: { date: "2005-04-26T20:40:57.101Z", age: 19 },
        phone: "9884822926",
        cell: "9649035827",
        id: { name: "UIDAI", value: "705075010442" },
        picture: {
            large: "https://randomuser.me/api/portraits/women/31.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/31.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/31.jpg"
        },
        nat: "IN"
    },
    {
        gender: "female",
        name: { title: "Ms", first: "Amélie", last: "Picard" },
        location: {
            street: { number: 826, name: "Place de L'Europe" },
            city: "Rueil-Malmaison",
            state: "Maine-et-Loire",
            country: "France",
            postcode: 31822,
            coordinates: { latitude: "74.7452", longitude: "-76.8289" },
            timezone: { offset: "-1:00", description: "Azores, Cape Verde Islands" }
        },
        email: "amelie.picard@example.com",
        login: {
            uuid: "aca7f058-d4bc-4080-b812-07646d1cb613",
            username: "beautifulmouse502",
            password: "ziggy",
            salt: "W6QpadE7",
            md5: "d230b3a9f2634e93c08e9ceae74aa4ba",
            sha1: "739813b590fb90c93e0afd13744a8bf94970628d",
            sha256: "83f36c9121291777a14a4f05904663976644cffaf1bd56b9f5a4e36e60586370"
        },
        dob: { date: "1976-11-01T00:11:39.460Z", age: 47 },
        registered: { date: "2016-12-05T00:01:42.991Z", age: 7 },
        phone: "02-14-12-97-37",
        cell: "06-09-62-84-98",
        id: { name: "INSEE", value: "2760905476379 53" },
        picture: {
            large: "https://randomuser.me/api/portraits/women/63.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/63.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/63.jpg"
        },
        nat: "FR"
    },

  ]};


  
}
