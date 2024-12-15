import { Component } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento.interface';
import { PanelAdministracionEventosService } from '../../services/panel-administracion-eventos.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {
  public isVisible: boolean = false;
  public tittle: string;
  public evento: Evento;

  constructor(private panelAdministracionEventosService: PanelAdministracionEventosService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.panelAdministracionEventosService.setModalInfo(this);
  }

  public openModal(evento: Evento) {
    if (evento?.id) {
      this.evento = evento;
      this.tittle = evento.nombre;
      this.isVisible = true;
    }
  }

  public cerrarModal() {
    this.isVisible = false;
  }



}
