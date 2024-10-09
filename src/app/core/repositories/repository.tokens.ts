// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';
import { IPeopleRepository } from './intefaces/people-repository.interface';
import { IBaseRepository } from './intefaces/base-repository.interface';


export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const PEOPLE_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>('IPeopleRepository');
export const PEOPLE_API_URL = new InjectionToken<string>('PeopleApiUrl');
