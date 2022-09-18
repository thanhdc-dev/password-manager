import { ApiMethod } from './const';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly API_URL = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  requestCall(api: string, method: ApiMethod, parameter?: any): Observable<any> {
    switch (method) {
      case ApiMethod.GET:
        return this._http.get(`${this.API_URL}${api}`, {params: parameter})
        .pipe(catchError(async (err) => this.handleError(err, this)));
      case ApiMethod.POST:
        return this._http.post(`${this.API_URL}${api}`, parameter)
        .pipe(catchError(async (err) => this.handleError(err, this)));
      case ApiMethod.DELETE:
        return this._http.delete(`${this.API_URL}${api}`, parameter)
        .pipe(catchError(async (err) => this.handleError(err, this)));
      case ApiMethod.PUT:
        return this._http.put(`${this.API_URL}${api}`, parameter)
        .pipe(catchError(async (err) => this.handleError(err, this)));
    }
  }

  private handleError(httpErrorResponse: HttpErrorResponse, self: any) {
    if (httpErrorResponse.error instanceof ErrorEvent) {
      console.log('An error occurred: ', httpErrorResponse.error.message);
    } else {
      console.log(httpErrorResponse.error.message, httpErrorResponse.status);
    }
  }
}
