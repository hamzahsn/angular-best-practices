import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { AuthenticationService } from 'app/core/services';
import { LoginFormComponent } from './login-form.component';

@Component({})
class DummyComponent {}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let debugElement: DebugElement;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'shipments', component: DummyComponent },
        ]),
      ],
      declarations: [LoginFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email should be required and match email pattern', () => {
    const emailControl = component.loginForm.controls.email;

    emailControl.setValue('test');
    let emailErrors = emailControl.errors || {};

    expect(emailControl.valid).toBeFalsy();
    expect(emailErrors.emailDomain).toBeTruthy();
    expect(emailErrors.emailDomain).toEqual('name@hostname.domain');

    emailControl.setValue('');
    emailErrors = emailControl.errors || {};

    expect(emailControl.valid).toBeFalsy();
    expect(emailErrors.required).toBeTruthy();
  });

  it('password should be required', () => {
    const passwordControl = component.loginForm.controls.password;

    passwordControl.setValue('');
    const emailErrors = passwordControl.errors || {};

    expect(passwordControl.valid).toBeFalsy();
    expect(emailErrors.required).toBeTruthy();
  });

  it('should display an error message when the email is not valid', () => {
    const emailControl = component.loginForm.controls.email;

    emailControl.setValue('test');
    fixture.detectChanges();
    let errors = debugElement.nativeElement.querySelectorAll('mat-error');

    expect(emailControl.valid).toBeFalsy();
    expect(errors[0].innerText).toEqual('Email is not valid.');

    emailControl.setValue('');
    fixture.detectChanges();
    errors = debugElement.nativeElement.querySelectorAll('mat-error');

    expect(emailControl.valid).toBeFalsy();
    expect(errors[0].innerText).toEqual('Email is required.');
  });

  it('should display an error message when the password is not valid', () => {
    const passwordControl = component.loginForm.controls.password;

    passwordControl.setValue('');
    fixture.detectChanges();
    const errors = debugElement.nativeElement.querySelectorAll('mat-error');

    expect(passwordControl.valid).toBeFalsy();
    expect(errors[1].innerText).toEqual('Password is required.');
  });

  it('should disable submit button when loginForm is not valid', () => {
    const emailInput = debugElement.nativeElement.querySelector(
      'input[type="email"]'
    );
    const passwordInput = debugElement.nativeElement.querySelector(
      'input[type="password"]'
    );
    const submitButton = debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );

    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should display error message when credentials are not valid', () => {
    spyOn(authService, 'login').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });

    component.ngOnInit();
    fixture.detectChanges();
    let errorMessage = debugElement.nativeElement.querySelector('#error-msg');
    expect(errorMessage).toBeFalsy();

    component.login();
    fixture.detectChanges();

    errorMessage = debugElement.nativeElement.querySelector('#error-msg');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.innerText).toEqual('Incorrect email or password.');
  });

  it('should redirect to shipments page when successfully login', inject(
    [Router],
    (router: Router) => {
      const fakeTokenResult = {
        access_token: 'myaccesstoken',
        token_type: 'Bearer',
      };
      spyOn(authService, 'login').and.callFake(() => of(fakeTokenResult));
      const routerSpy = spyOn(router, 'navigate').and.callThrough();

      component.login();
      fixture.detectChanges();

      expect(routerSpy).toHaveBeenCalledWith(['/shipments']);
    }
  ));
});
