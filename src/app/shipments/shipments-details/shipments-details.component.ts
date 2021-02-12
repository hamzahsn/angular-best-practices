import { Component, OnInit } from '@angular/core';

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
  dataSource = [];
  constructor() {}

  ngOnInit(): void {}
}
