import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servico-prestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  success: boolean = false;
  errors: String[];

  constructor(
    private clientesService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) {
    this.servicoPrestado = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe(response => this.clientes = response);
  }

  onSubmit(): void {
    this.servicoPrestadoService.save(this.servicoPrestado)
    .subscribe(response => {
      this.success = true;
      this.errors = null;
      this.servicoPrestado = new ServicoPrestado();
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    });
  }

}
