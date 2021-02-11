import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { AuthGuard, LoggedGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [LoggedGuard],
    component: AuthenticationComponent,
  },
  {
    path: 'shipments',
    canActivate: [AuthGuard],
    component: ShipmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
