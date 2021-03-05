import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.clientesService.getClientes()
    .subscribe(response => this.clientes = response);
  }

  novoCadastro(): void {
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
  }

  deletarCliente(): void {
    this.clientesService.delete(this.clienteSelecionado)
    .subscribe(responde => {
      this.mensagemSucesso = 'Cliente excluído com sucesso!';
      this.ngOnInit();
    },
    erro => this.mensagemErro = 'Ocorreu um erro ao excluir o(a) cliente.');
  }

}
