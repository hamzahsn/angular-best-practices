import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDetailsComponent } from './shipments-details.component';

describe('ShipmentsDetailsComponent', () => {
  let component: ShipmentsDetailsComponent;
  let fixture: ComponentFixture<ShipmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
