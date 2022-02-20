import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

constructor(private http: HttpClient) { }
  
  save(request: Result): Observable<Result> {
    return this.http.post<Result>(
      AppConstants.baseResultSave,
      request,
      <Object>AppConstants.httpOptions
    );
  }

  findAll(): Observable<Result[]> {
    return this.http.get<Result[]>(
      AppConstants.baseResult,
      <Object>AppConstants.httpOptions
    );
  }
}