import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private appName = environment.appName;

  constructor() { }

  /**
   * Lất tất cả giá trị cookie
   * @returns
   */
  getAll(): string {
    return decodeURIComponent(document.cookie ?? '');
  }

  /**
   * Lấy 1 cookie
   * @param key: Tên key muốn lưu trữ
   * @param defaultValue: Giá trị mặc định
   * @param expires
   */
  getItem(key: string, defaultValue: string = ''): string {
    const name = `${this.getAppKey(key)}=`;
    const cookieArray: string[] = this.getAll().split(';');
    const cookieLength = cookieArray.length
    for (let i = 0; i < cookieLength; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return defaultValue;
  }

  /**
   * Lưu 1 cookie
   * @param key: Tên
   * @param value: Giá trị lưu trữ
   * @param expires: Thời gian lưu trữ (milliseconds)
   */
  setItem(key: string, value: string, expires: number = 365 * 24 * 60 * 60 * 1000, path: string = '/') {
    const name = this.getAppKey(key);
    const cookieValueArray: string[] = [];
    const date: Date = new Date();
    date.setTime(date.getTime() + expires);
    // set expires
    cookieValueArray.push(`expires=${date.toUTCString()}`);
    // set path
    cookieValueArray.push(`path=${path}`);
    document.cookie = `${name}=${value};${cookieValueArray.join(';')}`;
  }

  /**
   * Xoá 1 cookie
   * @param key
   */
  removeItem(key: string) {
    return this.setItem(key, '', -1);
  }

  private getAppKey(name: string): string {
    return this.appName + '_' + name;
  }
}
