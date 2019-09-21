import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/services.index';
import { Usuarios } from 'src/app/modelos/usuarios';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup
  usuario: Usuarios;

  constructor(public _usuarioServices: UsuarioService, private router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') })
  }


  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value
      let pass2 = group.controls[campo2].value
      if (pass1 === pass2) {
        return null
      }
      return {
        sonIguales: true
      }
    }
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      console.log('no son igulaes')
      return
    }
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante Debe aceptar las condiciones!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      return
    } 

    this.usuario = {
      nombre : this.forma.value.nombre,
      email: this.forma.value.email,
      password: this.forma.value.password
    }

    this._usuarioServices.crearUsuario(this.usuario).subscribe(
      res => this.router.navigate(['/login'])
    )


  }

}
