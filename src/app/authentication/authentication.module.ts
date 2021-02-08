import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [AuthenticationComponent, LoginFormComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
