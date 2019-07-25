import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs-component/rxjs-component.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path: 'dashboard', component: DasboardComponent, data: { titulo: 'Dashboard', descripcion: 'Dashboard principal de la pagina' }
      },
      {
        path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', descripcion: 'Barras de progreso de la pagina' }
      },
      {
        path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', descripcion: 'Graficas con input, output' }
      },
      {
        path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'Ejercicio de promesas angular' }
      },
      {
        path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs', descripcion: 'Ejercicio de observables angular' }
      },
      {
        path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema', descripcion: 'Ajustes del tema' }
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
