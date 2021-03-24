import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL = environment.apiURLBase + '/api/servicos-prestados'
  constructor(
    private http: HttpClient
  ) { }

  save(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }

  search(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams().set('nome', nome).set('mes', mes ? mes.toString() : '');

    return this.http.get<any>(this.apiURL + "?" + httpParams.toString());
  }
}
