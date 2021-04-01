import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiURL: string = environment.apiURLBase + '/api/usuarios';
  private tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  logoutSession() {
    localStorage.removeItem('access_token');
  }

  getAuthenticatedUser() {;
    const token = this.getToken();
    if(token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

    isAuthenticated(): boolean {
      const token = this.getToken();
      if(token) {
        const expired = this.jwtHelper.isTokenExpired(token);
        return !expired;
      }
      return false;
    }

    save(usuario: Usuario): Observable<any> {
      return this.http.post<any>(this.apiURL, usuario);
    }

    tryLogin(username: string, password: string): Observable<any> {
      const params = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');

        // btoa codifica
      const headers = {
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      return this.http.post<any>(this.tokenURL, params.toString(), { headers });
    }
}
