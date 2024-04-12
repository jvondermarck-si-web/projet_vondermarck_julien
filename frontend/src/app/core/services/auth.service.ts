import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User | undefined;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      tap(user => this.user = user)
    );
  }

  register(user: User) {
    return this.http.post<User>('/api/auth/register', user).pipe(
      tap(user => this.user = user)
    );
  }
}
