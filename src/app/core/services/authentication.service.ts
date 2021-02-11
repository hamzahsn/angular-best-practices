import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { LoginInput } from 'app/authentication/shared/models';
import { Token } from 'app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
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
          return res;
        })
      ) as Observable<Token>;
  }

  public isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
