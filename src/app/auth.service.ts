import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

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
