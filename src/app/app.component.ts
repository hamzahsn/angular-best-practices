import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthenticationService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor(private authentication: AuthenticationService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authentication.isAuthenticatedV2();
  }
}
