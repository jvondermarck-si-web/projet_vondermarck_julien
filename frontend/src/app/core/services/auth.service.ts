import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.interface';
import { catchError, of, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    private translocoService: TranslocoService, 
    private readonly alerts: TuiAlertService, 
    private router: Router, 
    private jwtService: JwtService) { }

  public get user() {
    return this._user.asObservable();
  }

  public get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  public isAuthenticatedNow(): boolean {
    return this._isAuthenticated.getValue();
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      tap(user => {
        this._user.next(user);
        this._isAuthenticated.next(!!user);
        const message = this.translocoService.translate('sign-in.success-login', { user: user.firstName });
          this.alerts.open('', { label: message, status: 'success' }).subscribe();
      }),
      catchError(error => {
        this.alerts.open('',{ label: this.translocoService.translate('sign-in.error-login'), status: 'error' }).subscribe();
        return error;
      })
    );
  }

  register(user: User) {
    return this.http.post<User>('/api/auth/register', user).pipe(
      tap(user => {
        this._user.next(user);
        this._isAuthenticated.next(!!user);
        this.alerts.open( this.translocoService.translate("sign-up.success-sign-up"), { label: this.translocoService.translate("sign-up.success-welcome") + ' ' + user.firstName + '!', status: 'success'}).subscribe()
      }),
      catchError(error => {
        const errors = error.error.errors.map((error: { message: string }) => error.message);
        this.alerts.open(errors, { label: this.translocoService.translate('sign-up.error-register'), status: 'error' }).subscribe();
        return error;
      })
    );
  }

  update(user: User) {
    return this.http.put<User>('/api/auth/update', user).pipe(
      tap(user => {
        this._user.next(user);
        this._isAuthenticated.next(!!user);
        this.alerts.open('', { label: this.translocoService.translate('account.update-success'), status: 'success' }).subscribe();
      }),
      catchError(error => {
        const errors = error.error.errors.map((error: { message: string }) => error.message);
        this.alerts.open(errors, { label: this.translocoService.translate('account.update-error'), status: 'error' }).subscribe();
        return error;
      })
    );
  }

  logout() {
    this._user.next(null);
    this._isAuthenticated.next(false);
    this.router.navigate(['/sign-in']);

    this.translocoService.selectTranslate('sign-in.success-logout').subscribe(message => {
      this.alerts.open('', { label: message, status: 'info' }).subscribe();
    });
  }
}

