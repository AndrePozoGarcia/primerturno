import { Component } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento.interface';
import { VistaPrincipalService } from 'src/app/modulos/vista-principal/service/vista-principal.service';
import { PanelAdministracionEventosService } from '../../services/panel-administracion-eventos.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { TableRowSelectEvent } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TableComponent {

  public eventos: Evento[]
  public eventoSeleccionado: Evento = null;
  private modalFormComponent: ModalFormComponent;
  private modalInfoComponent: ModalInfoComponent;

  constructor(
    private vistaPrincipalService: VistaPrincipalService,
    private panelAdministracionEventosService: PanelAdministracionEventosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.inicializaTabla();
    this.inicializaForm();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }

  public crearEvento() {
    this.modalFormComponent.abrirCrear();
  }

  public editarEvento() {
    this.modalFormComponent.editarEvento(this.eventoSeleccionado);
  }

  public eliminarEvento() {
    if (this.eventoSeleccionado?.id) {

      this.confirmationService.confirm({
        message: '¿Estás seguro de que deseas eliminar el evento?',
        header: 'Confirmación',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.panelAdministracionEventosService
            .eliminarEvento(this.eventoSeleccionado.id)
            .subscribe(() => {
              this.getEventos()
              this.eventoSeleccionado = null
            }
            );
          this.mostrarMensaje('success', 'Éxito', 'Evento eliminado');
        },
        reject: (type: any) => {
          this.mostrarMensaje('info', 'Información', 'Operación cancelada');
        }
      });
      return;
    }
    this.mostrarMensaje('info', 'Información', 'Selecciona un evento');
  }

  public info() {
    this.modalInfoComponent.openModal(this.eventoSeleccionado);
  }

  public onRowSelect(event: TableRowSelectEvent) {
    this.eventoSeleccionado = event.data;
  }

  public onRowUnselect() {
    this.eventoSeleccionado = null;
  }

  private inicializaTabla() {
    this.getEventos();
  }

  private getEventos() {
    this.vistaPrincipalService.getEventos()
      .subscribe((eventos: Evento[]) => {
        this.eventos = eventos;
      });
  }

  private inicializaForm() {
    this.panelAdministracionEventosService.getForm()
      .subscribe((modalFormComponent: ModalFormComponent) => this.modalFormComponent = modalFormComponent)

    this.panelAdministracionEventosService.getModalInfo()
      .subscribe((modalInfoComponent: ModalInfoComponent) => this.modalInfoComponent = modalInfoComponent)
  }

  private mostrarMensaje(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }

}
