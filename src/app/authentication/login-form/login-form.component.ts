import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { AuthenticationService } from 'app/core/services';
import { takeUntil } from 'rxjs/operators';
import { emailDomainValidator } from 'app/shared/directives';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  loginForm: FormGroup;
  hasError = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailDomainValidator()]),
      password: new FormControl('', Validators.required),
    });
  }

  get formControl(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  login(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => this.router.navigate(['/shipments']),
        (error) => (this.hasError = true)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
