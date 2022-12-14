import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivate(): boolean {
    if (!this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/login');
    }
    return this._authService.isLoggedIn();
  }

}
