import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private readonly themeKey = 'theme';

  get theme(): string {
    return this.getStorageString(this.themeKey);
  }

  set theme(theme: string) {
    this.setStorageString(this.themeKey, theme);
  }

  private getStorageData<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  private getStorageString(key: string) {
    return localStorage.getItem(key);
  }

  private setStorageData(key: string, data: object) {
    let strData = null;
    if (data != null) {
      strData = JSON.stringify(data);
    }
    this.setStorageString(key, strData);
  }

  private setStorageString(key: string, data: string) {
    if (data == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, data);
    }
  }

}
