import { Component, Input, OnInit } from '@angular/core';
import { Shipment } from 'app/shared/models';

@Component({
  selector: 'app-shipments-details',
  templateUrl: './shipments-details.component.html',
  styleUrls: ['./shipments-details.component.scss'],
})
export class ShipmentsDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'reference',
    'cargo_type',
    'status',
    'origin',
    'destination',
    'planned_eta',
    'planned_etd',
    'cargo_units',
  ];

  @Input()
  dataSource: Shipment[] = [];

  constructor() {}

  ngOnInit(): void {}
}
