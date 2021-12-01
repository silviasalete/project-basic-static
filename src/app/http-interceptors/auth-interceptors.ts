import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAuthorizaionToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Erro cliente ou de rede
      console.log('Erro cliente ou de rede: ', error.error.message);
    } else {
      //Erro retornando pelo backend
      console.log('Erro retornando pelo backend');
      console.log('Status', error.status);
      console.log('Erro', error.error);
    }
    return throwError('Ocorreu um erro, tente novamente');
  }
}
