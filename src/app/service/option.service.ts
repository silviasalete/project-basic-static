import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Option } from '../models/option';
@Injectable({
  providedIn: 'root'
})
export class OptionService {

constructor(private http: HttpClient) { }

findAll(): Observable<Option[]> {
  return this.http.get<Option[]>(
    AppConstants.baseOption,
    <Object>AppConstants.httpOptions
  );
}

findByQuestion(question: number) {
  return this.http.get<Option[]>(
    AppConstants.baseCompanyFindByQuestion(question),
    <Object>AppConstants.httpOptions
  );
}
}
