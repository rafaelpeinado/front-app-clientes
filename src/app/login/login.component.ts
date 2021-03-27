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
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  onSubmit() {
    this.router.navigate(['/home']);
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
      this.loginError = false;
    }, error => {
      this.mensagemSucesso = null;
      this.loginError = true;
    })
  }
}
