import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthenticationService } from './core/services';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show the top-bar when the user is authenticated', inject(
    [AuthenticationService],
    (authenticationService: AuthenticationService) => {
      spyOn(authenticationService, 'isAuthenticatedV2').and.returnValue(
        of(true)
      );
      app.ngOnInit();
      fixture.detectChanges();

      const topBar = debugElement.nativeElement.querySelector('app-top-bar');
      expect(topBar).toBeTruthy();
    }
  ));

  it('should hide the top-bar when the user is not authenticated', inject(
    [AuthenticationService],
    (authenticationService: AuthenticationService) => {
      spyOn(authenticationService, 'isAuthenticatedV2').and.returnValue(
        of(false)
      );
      app.ngOnInit();
      fixture.detectChanges();

      const topBar = debugElement.nativeElement.querySelector('app-top-bar');
      expect(topBar).toBeFalsy();
    }
  ));
});
