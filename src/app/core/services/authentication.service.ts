import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { LoginInput } from 'app/authentication/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  public login({ email, password }: LoginInput): Observable<any> {
    const grant_type = 'password';
    return this.apiService.post('/oauth/token', {
      email,
      password,
      grant_type,
    });
  }

  public isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
