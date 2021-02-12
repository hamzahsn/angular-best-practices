import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipments-card',
  templateUrl: './shipments-card.component.html',
  styleUrls: ['./shipments-card.component.scss'],
})
export class ShipmentsCardComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  shipmentsCount = 0;

  constructor() {}

  ngOnInit(): void {}
}
