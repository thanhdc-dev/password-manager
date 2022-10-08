import { Injectable } from '@angular/core';
import { CookieService } from '@core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _tokenKeyStorage = 'access_token';
  private readonly _refreshTokenKeyStorage = 'refresh_token';

  constructor(
    private storage: CookieService,
  ) { }

  saveToken(token: string) {
    this.storage.setItem(this._tokenKeyStorage, token);
  }

  getToken(): string {
    return this.storage.getItem(this._tokenKeyStorage);
  }

  removeToken() {
    this.storage.removeItem(this._tokenKeyStorage)
  }

  saveRefreshToken(token: string) {
    this.storage.setItem(this._refreshTokenKeyStorage, token);
  }

  getRefreshToken(): string {
    return this.storage.getItem(this._refreshTokenKeyStorage);
  }

  removeRefreshToken() {
    this.storage.removeItem(this._refreshTokenKeyStorage)
  }
}
