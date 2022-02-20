import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { AnswerCalculated } from '../models/ansowercalculated';
import { Answer } from '../models/answer';
import { AnswerByUser } from '../models/answerbyuser';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

constructor(private http: HttpClient) { }
  
  save(request: AnswerByUser): Observable<AnswerCalculated> {
    return this.http.post<AnswerCalculated>(
      AppConstants.baseAnswerSave,
      request,
      <Object>AppConstants.httpOptions
    );
  }
}
