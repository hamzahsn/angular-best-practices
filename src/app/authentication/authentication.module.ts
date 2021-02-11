import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AuthenticationComponent } from './authentication.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [AuthenticationComponent, LoginFormComponent],
  imports: [
    CommonModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,

    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
