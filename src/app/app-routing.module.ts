import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
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
