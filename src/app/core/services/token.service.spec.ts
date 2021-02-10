import { TestBed } from '@angular/core/testing';
import { Token } from 'app/shared/models';

import { CookieService } from 'ngx-cookie-service';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService, CookieService],
    });
    service = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save the token in the cookies with key name `token`', () => {
    const cookieSpy = spyOn(cookieService, 'set').and.callThrough();
    const receivedToken: Token = {
      token_type: 'bearer',
      access_token: 'myaccesstoken',
    };
    service.setToken(receivedToken);

    expect(cookieSpy).toHaveBeenCalledWith(
      'tokenType',
      receivedToken.token_type
    );
    expect(cookieSpy).toHaveBeenCalledWith(
      'accessToken',
      receivedToken.access_token
    );
  });

  it('should get the stored token from the cookies', () => {
    spyOnProperty(document, 'cookie').and.returnValue(
      'tokenType=bearer; accessToken=myaccesstoken'
    );

    const expectedToken = 'bearer myaccesstoken';

    const result = service.getToken();
    expect(result).toEqual(expectedToken);
  });
});
