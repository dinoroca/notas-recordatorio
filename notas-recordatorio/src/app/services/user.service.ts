import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  //Comprueba si un user esta autenticado
  public isAutenticatedUser(): Boolean {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }

    return true;
  }
}
