import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsCardComponent } from './shipments-card.component';

describe('ShipmentsCardComponent', () => {
  let component: ShipmentsCardComponent;
  let fixture: ComponentFixture<ShipmentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
