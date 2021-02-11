import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'app/core/services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  hasError = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get formControl(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => this.router.navigate(['/shipments']),
      (error) => (this.hasError = true)
    );
  }
}
