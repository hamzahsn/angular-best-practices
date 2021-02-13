import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

import { Shipment } from 'app/shared/models';
import { ShipmentsComponent } from './shipments.component';
import { ShipmentsService } from 'app/core/services';
import { ShipmentsDetailsComponent } from './shipments-details/shipments-details.component';
import { ShipmentsCardComponent } from './shipments-card/shipments-card.component';

describe('ShipmentsComponent', () => {
  let component: ShipmentsComponent;
  let fixture: ComponentFixture<ShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShipmentsComponent,
        ShipmentsDetailsComponent,
        ShipmentsCardComponent,
      ],
      imports: [HttpClientTestingModule, MatTableModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the date of today', () => {
    const today = new Date();
    const result = component.getDateFrom(0);

    expect(today.toString()).toEqual(result.toString());
  });

  it('should get the date of the last 2 days', () => {
    jasmine.clock().mockDate(new Date('2020-10-10'));
    const difference = -2;
    const expectedDate = new Date('2020-10-08');
    const result = component.getDateFrom(difference);

    expect(new Date(expectedDate).toString()).toEqual(result.toString());
  });

  it('should count the shipments correctly', inject(
    [ShipmentsService],
    (shipmentsService: ShipmentsService) => {
      jasmine.clock().mockDate(new Date('2020-10-10'));
      const dataMock = [
        // shipments made in month
        { planned_eta: '2020-09-23' },
        { planned_eta: '2020-10-01' },
        { planned_eta: '2020-10-01' },
        // shipments made in 7 days
        { planned_eta: '2020-10-05' },
        { planned_eta: '2020-10-04' },
        { planned_eta: '2020-10-03' },
        { planned_eta: '2020-10-10' },
        // shipments made yesterday
        { planned_eta: '2020-10-09' },
        { planned_eta: '2020-10-09' },
      ] as Shipment[];

      spyOn(shipmentsService, 'list').and.returnValue(of(dataMock));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component.yesterdayCounter).toEqual(2);
      expect(component.inWeekCounter).toEqual(6);
      expect(component.inMonthCounter).toEqual(9);
    }
  ));
});
