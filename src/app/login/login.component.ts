import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  onSubmit() {
    this.authService
      .tryLogin(this.username, this.password)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      }, error => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      })
    
  }

  prepararCadastrar(event): void {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro(): void {
    this.cadastrando = false;
  }

  save() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.save(usuario)
    .subscribe(response => {
      this.mensagemSucesso = 'Cadastro realizado com sucesso" Efetue o login';
      this.errors = [];
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, errorResponse => {
      this.mensagemSucesso = null;
      this.errors = errorResponse.error.errors;
    })
  }
}
