import { Injectable, Injector, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService extends BaseService {
  constructor(
    injector: Injector,
    private authService: AuthService
  ) {
    super(injector);
    this.setEndPoint(`/user-passwords`);
  }
}
