import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { ShipmentsService } from './shipments.service';

describe('ShipmentsService', () => {
  let service: ShipmentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipmentsService],
    });
    service = TestBed.inject(ShipmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('use correct endpoint when fetching shipments', () => {
    const expectedEndpoint = `${environment.CARGO_API}/shipments`;

    service.list().subscribe();

    const req = httpMock.expectOne(expectedEndpoint);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(expectedEndpoint);
    req.flush([]);
  });
});
