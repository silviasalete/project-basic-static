import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Company[]> {
    return this.http.get<Company[]>(
      AppConstants.baseCompany,
      <Object>AppConstants.httpOptions
    );
  }
  
  save(request: any): Observable<Company> {
    let company:Company = {} as Company;
    company.id = request.id;
    company.nome = request.nome;
    company.city = request.city;
    company.country = request.country;
    return this.http.post<Company>(
      AppConstants.baseCompanySave,
      company,
      <Object>AppConstants.httpOptions
    );
  }
  findById(id: number): Observable<Company> {
    return this.http.get<Company>(AppConstants.baseCompanyFindById(id));
  }
  delete(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseCompanyDelete(id));
  }
}
