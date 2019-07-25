import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-component',
  templateUrl: './rxjs-component.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription

  constructor() {
    // pipe(retry(2))
    this.suscription =  this.retornaObservable().subscribe(
      numero => { console.log(numero) },
      error => { console.log('error', error) },
      () => console.log('el observador termino')
    )
  }

  ngOnInit() {
  }

  retornaObservable(): Observable<any> {

    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2){
        //   clearInterval(intervalo);
        //   observer.error('auxilio')
        // }
      }, 1000);
    }).pipe(map((resp: any) => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          //impar
          return true;
        } else {
          //par
          return false;
        }

      })
    );
  }



  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

}
