import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
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
});
