import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Shipment } from 'app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  constructor(private apiService: ApiService) {}

  public list(): Observable<Shipment[]> {
    return this.apiService.get('/shipments');
  }
}
