import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private appName = environment.appName;
  private storage = sessionStorage;

  constructor() { }

  setItem(key: string, value: string) {
    this.storage.setItem(this.getAppKey(key), value);
  }

  setItemObject(key: string, object: object) {
    this.storage.setItem(this.getAppKey(key), JSON.stringify(object));
  }

  getItem(key: string, defaultValue: any = ''): string {
    return this.storage.getItem(this.getAppKey(key)) ?? defaultValue;
  }

  getItemObject(key: string, defaultValue: any = null): object {
    return this.storage.getItem(this.getAppKey(key)) ?? defaultValue;
  }

  removeItem(key: string) {
    this.storage.removeItem(this.getAppKey(key));
  }

  clear() {
    this.storage.clear();
  }

  private getAppKey(name: string): string {
    return this.appName + '_' + name;
  }
}
