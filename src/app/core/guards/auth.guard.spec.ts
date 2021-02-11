import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'app/app-routing.module';

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
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
    });
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

  it('should redirect to login page when the user not authenticated', inject(
    [Router],
    (router: Router) => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      const routerSpy = spyOn(router, 'navigate').and.callThrough();

      guard.canActivate(dummyRoute, fakeRouterState('/test'));

      expect(routerSpy).toHaveBeenCalledWith(['login']);
    }
  ));
});
