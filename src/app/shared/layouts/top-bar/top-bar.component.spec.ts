import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'app/core/services';

import { of } from 'rxjs';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TopBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logged out when click on the button', inject(
    [AuthenticationService, Router],
    (authService: AuthenticationService, router: Router) => {
      const logoutSpy = spyOn(authService, 'logout').and.returnValue(of(true));
      const routerSpy = spyOn(router, 'navigate').and.callThrough();
      const logoutBtn = debugElement.nativeElement.querySelector('button');

      logoutBtn.click();
      fixture.detectChanges();

      expect(logoutSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    }
  ));
});
