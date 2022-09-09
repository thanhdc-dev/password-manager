import { Injectable } from '@angular/core';
import { ApiMethod } from '@shared/services/const';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly endPoint: string = '/dashboard';
  constructor(private _httpService: HttpService) { }

  index(): Observable<any> {
    return this._httpService.requestCall(this.endPoint, ApiMethod.GET);
  }
}
