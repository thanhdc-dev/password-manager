import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@shared/services/http.service';
import { ApiMethod } from '@shared/services/const';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends HttpService {
  private endPoint: string = '';

  constructor(injector: Injector) {
    super(injector);
  }

  setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }

  index(params: any = {}): Observable<any> {
    return this.requestCall(`${this.endPoint}`, ApiMethod.GET, params);
  }

  store(params: any): Observable<any> {
    return this.requestCall(`${this.endPoint}`, ApiMethod.POST, params);
  }

  show(id: string): Observable<any> {
    return this.requestCall(`${this.endPoint}/${id}`, ApiMethod.GET);
  }

  update(id: string, params: any): Observable<any> {
    return this.requestCall(`${this.endPoint}/${id}`, ApiMethod.PUT, params);
  }

  delete(ids: string[]): Observable<any> {
    return this.requestCall(`${this.endPoint}/`, ApiMethod.DELETE, {ids});
  }
}
