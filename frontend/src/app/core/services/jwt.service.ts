import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtToken: string | undefined = undefined;

  public updateRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.jwtToken && !this.isTokenExpired()) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}` },
      });
    }

    return request;
  }

  public getTokenFromResponse(response: HttpResponse<unknown>) {
    const authorization = response.headers.get('authorization');

    if (authorization) {
      const bearer = authorization.split(' ')[1];
      if (bearer) {
        this.jwtToken = bearer;
      } else {
        this.jwtToken = undefined;
      }
    }
  }

  public clearToken() {
    this.jwtToken = undefined;
  }

  private isTokenExpired(): boolean {
    const decodedToken: any = jwtDecode(this.jwtToken!);
    if (decodedToken.exp === undefined) return false;

    const date = new Date(0); 
    date.setUTCSeconds(decodedToken.exp);
    return !(date.valueOf() > new Date().valueOf());
  }
}
