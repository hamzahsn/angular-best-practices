import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ShipmentsService } from 'app/core/services';
import { Shipment } from 'app/shared/models';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
})
export class ShipmentsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  shipmentsData: Shipment[] = [];
  yesterdayCount = 0;
  lastWeekCount = 0;
  lastMonthCount = 0;

  constructor(private shipmentsService: ShipmentsService) {}

  ngOnInit(): void {
    this.fetchShipments();
  }

  fetchShipments(): void {
    this.shipmentsService
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.shipmentsData = data;
        this.countShipments(data);
      });
  }

  countShipments(data: Shipment[]): void {
    const today = new Date();
    const yesterday = this.getDateFrom(-1);
    const lastWeek = this.getDateFrom(-7);
    const lastMonth = this.getDateFrom(-30);
    const counter = { yesterday: 0, week: 0, month: 0 };

    data.forEach(({ planned_eta }) => {
      const estimatedArrivalTime = new Date(planned_eta);

      if (+estimatedArrivalTime === +yesterday) {
        counter.yesterday++;
      }

      if (estimatedArrivalTime <= today) {
        if (estimatedArrivalTime >= lastWeek) {
          counter.week++;
        }

        if (estimatedArrivalTime >= lastMonth) {
          counter.month++;
        }
      }
    });

    this.yesterdayCount = counter.yesterday;
    this.lastWeekCount = counter.week;
    this.lastMonthCount = counter.month;
  }

  getDateFrom(daysDifference: number): Date {
    const date = new Date();

    date.setDate(date.getDate() + daysDifference);
    return new Date(date);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
