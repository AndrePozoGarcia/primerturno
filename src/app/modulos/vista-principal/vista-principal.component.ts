import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataViewLayoutChangeEvent } from 'primeng/dataview';
import { PrimeModule } from 'src/app/prime.module';
import { VistaPrincipalService } from './service/vista-principal.service';
import { Promo } from 'src/app/interfaces/promo.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { AuthService } from '../login/service/auth.service';
import { ModalComponent } from 'src/app/componentes/modal/modal.component';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css'],
  standalone: true,
  imports: [RouterModule, PrimeModule, CommonModule, ModalComponent],
})
export default class VistaPrincipalComponent {

  public autenticado: boolean;
  public eventos: Evento[];
  public modal: ModalComponent;

  public data: Evento[];
  public tittle: string = 'Eventos';
  constructor(
    private router: Router,
    private vistaPrincipalService: VistaPrincipalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.autenticado = this.authService.isToken();
    this.getEventos();
    this.inicializaModal();
  }

  private inicializaModal() {
    this.vistaPrincipalService.trigger.subscribe((modal: ModalComponent) => {
      this.modal = modal;
    });
  }

  public getEventos() {
    this.vistaPrincipalService.getEventos()
      .subscribe((promos: Evento[]) => {
        this.data = promos.filter((evento) => !evento.descuento);
      });
  }

  public getPromos() {
    this.vistaPrincipalService.getEventos()
      .subscribe((promos: Evento[]) => {
        this.data = promos.filter((evento) => evento.descuento > 0);
      });
  }

  public ingresarCard(id: string) {
    this.router.navigate([`/evento/${id}`]);
  }

  public cambiarVista(event: DataViewLayoutChangeEvent) {

    if (event.layout === 'grid') {
      this.getPromos();
      this.tittle = 'Promociones';
      return;
    }
    this.getEventos();
    this.tittle = 'Eventos';
  }
  public cerrarSesion(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
    this.vistaPrincipalService.deleteCarritoService();
  }

  public openModal() {
    this.modal.openModal();
  }

}
