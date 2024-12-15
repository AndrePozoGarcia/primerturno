import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdministracionEventosModule } from './panel-administracion-eventos.module';

@Component({
  selector: 'app-panel-administracion-eventos',
  standalone: true,
  imports: [CommonModule, PanelAdministracionEventosModule],
  templateUrl: './panel-administracion-eventos.component.html',
  styleUrls: ['./panel-administracion-eventos.component.css']
})
export default class PanelAdministracionEventosComponent {

}
