import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(JwtService);

  req = tokenService.updateRequest(req);
  
  return next(req)
    .pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          tokenService.getTokenFromResponse(event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          tokenService.clearToken();
        }
        return throwError(() => error);
      }),
    );
};
