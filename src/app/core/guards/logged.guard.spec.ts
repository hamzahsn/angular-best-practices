import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from '../services';
import { LoggedGuard } from './logged.guard';
import { routes } from 'app/app-routing.module';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('LoggedGuard', () => {
  let guard: LoggedGuard;
  let authService: AuthenticationService;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
    });
    guard = TestBed.inject(LoggedGuard);
    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to shipments page when the user is authenticated', inject(
    [Router],
    (router: Router) => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      const routerSpy = spyOn(router, 'navigate').and.callThrough();

      guard.canActivate(dummyRoute, fakeRouterState('/test'));

      expect(routerSpy).toHaveBeenCalledWith(['shipments']);
    }
  ));

  it('should return true when the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('/test'));

    expect(canActivate).toBeTruthy();
  });
});
