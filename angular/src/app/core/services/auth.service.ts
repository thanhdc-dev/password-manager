import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Router } from '@angular/router';
import { AuthEndPoint } from './const';
import { LoginPayload, RegisterPayload } from '@core/interfaces/auth';
import { CookieService } from './cookie.service';
import { Observable, of } from 'rxjs';
import { catchError, tap, mapTo, map } from 'rxjs/operators';
import { ApiMethod } from '@shared/services/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  user: any = {};

  constructor(
    injector: Injector,
    private _token: TokenService,
    private _storage: CookieService,
    private _router: Router,
  ) {
    super(injector);
    this.init();
  }

  login(email: string, password: string): Observable<boolean> {
    const params: LoginPayload = { email, password };
    return this.requestCall(AuthEndPoint.LOGIN, ApiMethod.POST, params)
      .pipe(
        tap(res => {
          if (!!res?.access_token) {
            this.doLogin(res);
          }
        }),
        map(({status}) => !!status),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    return !!this._token.getToken();
  }

  getUserLogin(): any {
    const userData = this._storage.getItem('user');
    return userData ? JSON.parse(userData) : {};
  }

  logout(): Observable<boolean> {
    return this.requestCall(AuthEndPoint.LOGOUT, ApiMethod.DELETE)
      .pipe(
        tap(res => {
          if (!!res?.status) {
            this.doLogout();
          }
        }),
        map(({status}) => !!status),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  refreshToken() {
    const params = { refresh_token: this._token.getRefreshToken() };
    return this.requestCall(AuthEndPoint.REFRESH_TOKEN, ApiMethod.POST, params)
      .pipe(
        tap((res) => {
          if (res?.status) {
            this._token.saveRefreshToken(res.token)
          } else {
            this.doLogout();
          }
        })
      )
  }

  register(params: RegisterPayload): Observable<boolean> {
    return this.requestCall(AuthEndPoint.REGISTER, ApiMethod.POST, params).pipe(
      map((res: {status: boolean}) => !!res?.status),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  private init() {
    if (this.isLoggedIn()) {
      this.user = this.getUserLogin();
    }
  }

  private doLogin(data: any) {
    if (data?.access_token) {
      this._token.saveToken(data?.access_token);
      this._token.saveRefreshToken(data?.refresh_token);
      this._router.navigateByUrl('/dashboard');
      this.fetchUserLogin();
    }
  }

  private doLogout() {
    this._token.removeToken();
    this._token.removeRefreshToken();
    this._router.navigateByUrl('/login');
    this.removeUserLogin();
  }

  private fetchUserLogin() {
    this.requestCall(AuthEndPoint.CURRENT_USER, ApiMethod.GET).subscribe(res => {
      if (res.data) {
        this._storage.setItem('user', JSON.stringify(res.data));
      }
    });
  }

  private removeUserLogin() {
    this._storage.setItem('user', '', -1);
  }
}
