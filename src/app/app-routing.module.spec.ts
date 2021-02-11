/* tslint:disable:no-unused-variable */
import { Location } from '@angular/common';
import {
  TestBed,
  fakeAsync,
  getTestBed,
  ComponentFixture,
  flush,
  waitForAsync,
  inject,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './core/services';

describe('AppRoutingModule', () => {
  let injector: TestBed;
  let location: Location;
  let router: Router;
  let ngZone: NgZone;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          HttpClientModule,
          RouterTestingModule.withRoutes(routes),
        ],
        declarations: [AuthenticationComponent],
        providers: [CookieService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    injector = getTestBed();
    fixture = injector.createComponent(AuthenticationComponent);
    fixture.detectChanges();

    router = injector.inject(Router);
    location = injector.inject(Location);
    ngZone = injector.inject(NgZone);
    ngZone.run(() => router.initialNavigation());
  });

  afterEach(() => fixture.destroy());

  it('navigate to `/` takes you to `/login` when not logged in', fakeAsync(
    inject([AuthenticationService], (authService: AuthenticationService) => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      ngZone.run(() => router.navigate(['/']));
      flush();
      expect(location.path()).toBe('/login');
    })
  ));

  it('navigate to `/` takes you to `/shipments` when logged in', fakeAsync(
    inject([AuthenticationService], (authService: AuthenticationService) => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      ngZone.run(() => router.navigate(['/']));
      flush();
      expect(location.path()).toBe('/shipments');
    })
  ));
});
