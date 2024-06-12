import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  //USER
  registro_user(data: any): Observable<any> {
    return this._http.post(this.url + 'auth/register', data);
  }
  
  login_user(data: any): Observable<any> {
    return this._http.post(this.url + 'auth/login', data);
  }
}
