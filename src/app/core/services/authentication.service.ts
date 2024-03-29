import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { LoginInput } from 'app/authentication/shared/models';
import { Token } from 'app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  public login({ email, password }: LoginInput): Observable<Token> {
    const grant_type = 'password';
    return this.apiService
      .post('/oauth/token', {
        email,
        password,
        grant_type,
      })
      .pipe(
        map((res) => {
          this.tokenService.setToken(res);
          this.authenticated$.next(true);
          return res;
        })
      ) as Observable<Token>;
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get('accessToken');
  }

  public isAuthenticatedV2(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  public logout(): Observable<any> {
    return this.apiService.delete('/oauth/signout').pipe(
      map((res) => {
        this.tokenService.clearToken();
        this.authenticated$.next(false);
        return res;
      })
    );
  }
}
