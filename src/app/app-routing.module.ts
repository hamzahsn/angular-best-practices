import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { ShipmentsComponent } from './shipments/shipments.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'shipments',
    component: ShipmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
