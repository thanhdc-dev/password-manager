import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {

  }
  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/dashboard');
    }
    return !this._authService.isLoggedIn();
  }

}
