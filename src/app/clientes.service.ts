import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(
    private http: HttpClient
  ) { }


  save(cliente: Cliente): Observable<Cliente> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);

    const headers = {
      'Authorization': "Bearer " + token.access_token
    };

    return this.http.post<Cliente>(`${this.apiURL}`, cliente, { headers });
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);

    const headers = {
      'Authorization': "Bearer " + token.access_token
    };

     return this.http.get<Cliente[]>(`${this.apiURL}`, { headers });
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  delete(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}
