import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('use correct endpoint when logging in', () => {
    const expectedEndpoint = `${environment.CARGO_API}/oauth/token`;
    const credentials = {
      email: 'user@host.com',
      password: 'supersecretpassword',
    };
    service.login(credentials).subscribe();

    const req = httpMock.expectOne(expectedEndpoint);

    expect(req.request.method).toBe('POST');
    expect(req.request.url).toEqual(expectedEndpoint);
    req.flush([]);
  });

  it('should use the correct credentials', () => {
    const credentials = {
      email: 'user@host.com',
      password: 'supersecretpassword',
    };
    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${environment.CARGO_API}/oauth/token`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'user@host.com',
      password: 'supersecretpassword',
      grant_type: 'password',
    });
    req.flush([]);
  });

  it('should return false when there is a no token stored in the cookies', () => {
    spyOn(tokenService, 'getToken').and.returnValue('');

    const result = service.isAuthenticated();
    expect(result).toBeFalsy();
  });

  it('should return true when there is a token stored in the cookies', () => {
    spyOn(tokenService, 'getToken').and.returnValue('mysecrettoken');

    const result = service.isAuthenticated();
    expect(result).toBeTruthy();
  });
});
