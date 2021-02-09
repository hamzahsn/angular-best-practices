import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { LoginInput } from 'app/authentication/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private apiService: ApiService) {}

  public login({ email, password }: LoginInput): Observable<any> {
    const grant_type = 'password';
    return this.apiService.post('/oauth/token', {
      email,
      password,
      grant_type,
    });
  }
}
