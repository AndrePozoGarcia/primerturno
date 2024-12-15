import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService2 {

  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initValue();
   }

  public isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  public login( token: string ) {
    this.setToken(token);
    this._isAuthenticated.next(true);
  }

  public logout() {
    this.removeToken();
    this._isAuthenticated.next(false);
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private isTokenValid(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  private initValue() {
    if (this.isTokenValid()) {
      this._isAuthenticated.next(true);
    }
  }




}
