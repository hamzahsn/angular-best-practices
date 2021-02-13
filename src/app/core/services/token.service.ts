import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Token } from 'app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  getToken(): string {
    const accessToken = this.cookieService.get('accessToken');
    const tokenType = this.cookieService.get('tokenType');

    return `${tokenType} ${accessToken}`;
  }

  setToken({ access_token, token_type }: Token): void {
    this.cookieService.set('tokenType', `${token_type}`);
    this.cookieService.set('accessToken', `${access_token}`);
  }

  clearToken(): void {
    this.cookieService.delete('tokenType');
    this.cookieService.delete('accessToken');
  }
}
