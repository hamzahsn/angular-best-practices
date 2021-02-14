import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { TopBarComponent } from './layouts';

@NgModule({
  declarations: [TopBarComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  exports: [TopBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
