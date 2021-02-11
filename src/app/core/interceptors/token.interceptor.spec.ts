import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { TokenService } from '../services';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(TokenInterceptor);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add the Authorization header to request headers', inject(
    [TokenService, HttpClient],
    (tokenService: TokenService, http: HttpClient) => {
      spyOn(tokenService, 'getToken').and.returnValue('Bearer mysecrettoken');

      http.get('my_endpoint').subscribe();

      const req = httpMock.expectOne('my_endpoint');
      expect(req.request.headers.get('Authorization')).toEqual(
        'Bearer mysecrettoken'
      );
      req.flush([]);
    }
  ));
});
