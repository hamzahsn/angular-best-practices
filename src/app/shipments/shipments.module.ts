import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { ShipmentsComponent } from './shipments.component';
import { ShipmentsCardComponent } from './shipments-card/shipments-card.component';
import { ShipmentsDetailsComponent } from './shipments-details/shipments-details.component';

@NgModule({
  declarations: [
    ShipmentsComponent,
    ShipmentsCardComponent,
    ShipmentsDetailsComponent,
  ],
  imports: [CommonModule, MatCardModule, MatTableModule],
})
export class ShipmentsModule {}
