import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { City } from '../models/city';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(private httpClient: HttpClient) { }

listCounties():Observable<Country[]> {
  return this.httpClient.get<Country[]>(AppConstants.baseCountry);
}

listCities(acronyms: number):Observable<City[]> {
  return this.httpClient.get<City[]>(AppConstants.baseCity(acronyms));
}
}
