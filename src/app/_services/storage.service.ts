import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private readonly themeKey = 'theme';
  private readonly tokenKey = 'token';
  private readonly userKey = 'currentUser';
  private readonly userTypeKey = 'userType';

  get theme(): string {
    return this.getStorageString(this.themeKey);
  }

  set theme(theme: string) {
    this.setStorageString(this.themeKey, theme);
  }

  get token(): string {
    return this.getStorageString(this.tokenKey);
  }

  set token(token: string) {
    this.setStorageString(this.tokenKey, token);
  }

  get currentUser(): string {
    return this.getStorageString(this.userKey);
  }

  set currentUser(user: string) {
    this.setStorageString(this.userKey, user);
  }

  get userType(): string {
    return this.getStorageString(this.userTypeKey);
  }

  set userType(userType: string) {
    this.setStorageString(this.userTypeKey, userType);
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
