import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

constructor(public _usuarioservices: UsuarioService, public router: Router){

}

  canActivate() {

    if (this._usuarioservices.estaLogueado()) {
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
