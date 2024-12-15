import { Component } from '@angular/core';
import { PanelAdministracionEventosService } from '../../services/panel-administracion-eventos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/interfaces/evento.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
  providers: [MessageService]
})
export class ModalFormComponent {
  public isvisible: boolean;
  public submitted: boolean = false;
  public form: FormGroup;
  public tittleForm: string;
  private eventoSeleccionado: Evento;
  constructor(
    private panelAdministracionEventosService: PanelAdministracionEventosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.form = this.inicializaForm();
  }

  ngAfterViewInit(): void {
    this.panelAdministracionEventosService.setForm(this);

  }

  ngOnDestroy(): void {
  }

  public editarEvento(evento: Evento) {
    if (evento?.id) {
      this.tittleForm = 'Editar Evento';
      this.form.patchValue(evento);
      this.form.get('fecha').setValue(this.convertirDate(evento.fecha));
      this.eventoSeleccionado = evento;
      this.openModal();
      if (evento.destacar) {
        this.form.get('descuento').enable();
      }
      return;
    }
    this.mostrarMensaje('info', 'Información', 'No hay evento seleccionado');
  }

  public abrirCrear() {
    this.tittleForm = 'Crear Evento';
    this.openModal();
  }

  public openModal() {
    this.isvisible = true;
  }

  public cerrarModal() {
    this.isvisible = false;
    this.submitted = false;
    this.limpiarModal();
  }

  public guardarEvento() {
    if (this.form.value.id) {
      this.actualizarEvento();
      return;
    }
    this.crearEvento();
  }

  public onSwitch(state: boolean) {
    this.form.get('descuento').enable();
    if (!state) {
      this.form.get('descuento').disable();
      this.form.get('descuento').setValue(0);
    }
  }

  private crearEvento() {
    this.submitted = true;
    if (this.form.valid) {
      const evento: Evento = { ...this.form.value, fecha: this.convetirDateString(this.form.value.fecha) };
      this.panelAdministracionEventosService.crearEvento(evento)
        .subscribe(() => {
          this.mostrarMensaje('success', 'Éxito', 'Evento guardado');
          this.cerrarModal();
        });
    }
  }

  public actualizarEvento() {
    this.submitted = true;
    if (this.form.valid) {
      const evento: Evento = { ...this.form.value, fecha: this.convetirDateString(this.form.value.fecha) };
      this.panelAdministracionEventosService.editarEvento(evento)
        .subscribe(() => {
          this.mostrarMensaje('success', 'Éxito', 'Evento actualizado');
          this.cerrarModal();
        });
    }
  }

  private inicializaForm(): FormGroup {
    return new FormGroup(
      {
        id: new FormControl<string>(''),
        nombre: new FormControl<string>('', [Validators.required]),
        categoria: new FormControl<string>('', [Validators.required]),
        boletos: new FormControl<number>(null, [Validators.required]),
        imagen: new FormControl<string>(''),
        descripcion: new FormControl<string>(''),
        precio: new FormControl<number>(null, [Validators.required]),
        lugar: new FormControl<string>('', [Validators.required]),
        fecha: new FormControl<Date>(new Date(), [Validators.required]),
        descuento: new FormControl<number>({ value: 0, disabled: true }),
        destacar: new FormControl<boolean>(false)
      }
    );
  }

  private limpiarModal() {
    this.form = this.inicializaForm();
  }

  private mostrarMensaje(tipo: string, titulo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: titulo, detail: mensaje });
  }

  private convetirDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private convertirDate(date: string): Date {
    return new Date(date);
  }

}
