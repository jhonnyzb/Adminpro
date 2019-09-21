import { Injectable } from '@angular/core';
import { Usuarios } from 'src/app/modelos/usuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuarios
  token:string

  constructor(public http: HttpClient, public router: Router) {
   this.cargarEstorage()
  }


  estaLogueado(){
    return (this.token.length > 5)? true : false; 
  }

  cargarEstorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuarios) {
    let url = environment.url_Base + '/usuario'
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire(
          'Usuario creado',
          usuario.email,
          'success'
        )
        return resp.usuario
      })
    )

  }


logout(){
  this.usuario = null
  this.token = ''

  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  this.router.navigate(['/login'])
}


  login( usuario: Usuarios, recordar: boolean = false){

    if (recordar) {
      localStorage.setItem('email', usuario.email)
    }else{
      localStorage.removeItem('email')
    }

    let url = environment.url_Base + '/login'
    return this.http.post(url, usuario).pipe(
      map((res:any)=>{
        this.guardarStorage(res.id, res.token, res.usuario)
        return true
      })
    )
    
  }



  loginGoogle(token){
    let url = environment.url_Base + '/login/google'
    return this.http.post(url, { token }).pipe(
      map((res: any)=>{
        this.guardarStorage(res.id, res.token, res.usuario)
        return true
      })
    )
  }


  guardarStorage(id: string, token: string, usuario: Usuarios){
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

    this.usuario = usuario
    this.token = token
  }
 
}
