import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    
    this.contartres().then(
      (res) => console.log('termino',res)
    ).catch(
      error => console.error(error)
    )}

  ngOnInit() {
  }

  contartres() {

   return new Promise<boolean>((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log( contador )
        if (contador === 3) {
          resolve( true );
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
