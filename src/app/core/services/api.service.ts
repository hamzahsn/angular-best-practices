import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public formatErrors(error: any): Observable<never> {
    throw new Error(error);
  }

  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.CARGO_API}${path}`)
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: Record<string, string | number> = {}
  ): Observable<any> {
    return this.http
      .post(`${environment.CARGO_API}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.CARGO_API}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
