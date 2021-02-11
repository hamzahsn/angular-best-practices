import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Data, Router } from '@angular/router';

import { ErrorInterceptor } from './error.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(ErrorInterceptor);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should redirect to login page when receiving 401', inject(
    [HttpClient, Router],
    (http: HttpClient, router: Router) => {
      const routerSpy = spyOn(router, 'navigate').and.callThrough();

      http.get<Data>('testUrl').subscribe();

      const req = httpMock.expectOne('testUrl');

      req.flush('deliberate 401 error', {
        status: 401,
        statusText: 'Unauthorized',
      });

      expect(routerSpy).toHaveBeenCalledWith(['/']);
    }
  ));
});
