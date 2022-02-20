import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Token } from '../models/token.entities';
import { User } from '../models/user';
import { UserView } from '../models/user-view';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createAccount(request: User, typeRegister: string): Observable<User> {
    
    let url = "";
    
    typeRegister == 'admin'? url = AppConstants.baseAdminSave: url = AppConstants.baseUserSave;
    

    return this.httpClient.post<User>(
      url,
      JSON.stringify(request),
      <Object>AppConstants.httpOptions
    );
  }

  login(request: User): Observable<Token> {
    return this.httpClient.post<Token>(
      AppConstants.baseAuth,
      JSON.stringify(request),
      <Object>AppConstants.httpOptions
    );
  }

  findUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(AppConstants.baseUserFindById(id));
  }
  
  findAllUser() {
    return this.httpClient.get<UserView[]>(AppConstants.baseUser);
  }
}
