import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuarios } from '../modelos/usuarios';
import { UsuarioService } from '../services/services.index';
declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuarios
  recuerdame: boolean = false
  correo: string
  auth2: any;

  constructor(public router: Router, private servicioUsuario: UsuarioService) { }

  ngOnInit() {
    this.googleInit();
    init_plugins();
    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 0) {
      this.recuerdame = true
    }
  }



  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '229925538257-4qcpgv5vef88j1duca1bokq12jn5odvf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })

      this.attachSignin(document.getElementById('btnGoogle'))
    })
  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile()
      let token = googleUser.getAuthResponse().id_token

      this.servicioUsuario.loginGoogle(token).subscribe(
        () => window.location.href = '#/dashboard'
      )
    })
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.usuario = {
      nombre: null,
      email: form.value.correo,
      password: form.value.password
    }
    this.servicioUsuario.login(this.usuario, form.value.recuerdame)
      .subscribe(correcto => { this.router.navigate(['/dashboard']) })
  }
}


