import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _usarioService: UsuarioService, public _sidebar: SidebarService ) { }

  ngOnInit() {
  }

}
