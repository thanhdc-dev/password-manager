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

  show(uuid: string): Observable<any> {
    return this.requestCall(`${this.endPoint}/${uuid}`, ApiMethod.GET);
  }

  update(uuid: string, params: any): Observable<any> {
    return this.requestCall(`${this.endPoint}/${uuid}`, ApiMethod.PUT, params);
  }

  delete(uuids: string[]): Observable<any> {
    return this.requestCall(`${this.endPoint}/`, ApiMethod.DELETE, {uuids});
  }
}
