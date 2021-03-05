import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;


  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParamans => {
      this.id = urlParamans['id'];
      if(this.id) {
        this.clientesService.getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        );
      }
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.clientesService.update(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.'];
        });
    } else {
      this.clientesService.save(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        });
    }

  }

  backToList() {
    this.router.navigate(['/clientes-lista']);
  }
}
