import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthenticationService;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('/test'));

    expect(canActivate).toBeTruthy();
  });

  it('should return false when the user not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('/test'));

    expect(canActivate).toBeFalsy();
  });
});
