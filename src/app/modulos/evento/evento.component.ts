import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoModule } from './evento.module';
import { VistaPrincipalService } from '../vista-principal/service/vista-principal.service';
import { Evento } from 'src/app/interfaces/evento.interface';
import { Carrito } from 'src/app/interfaces/carrito.interface';
import { AuthService } from '../login/service/auth.service';
import { ModalComponent } from 'src/app/componentes/modal/modal.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, EventoModule],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export default class EventoComponent {
  public productId!: string;
  public cantidadBoletos: number = 1;
  public montoTotal: number = 0;
  public evento: Evento;
  public modal: ModalComponent;


  constructor(private route: ActivatedRoute,
    private vistaPrincipalService: VistaPrincipalService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
      this.getEventoById(this.productId);
    }
    );

    this.inicializaModal();
  }

  private inicializaModal() {
    this.vistaPrincipalService.trigger.subscribe((modal: ModalComponent) => {
      this.modal = modal;
    });
  }

  public incrementar(): void {
    this.cantidadBoletos++;
    this.montoTotal = this.calcularMontoTotal();
  }

  public decrementar(): void {
    if (this.cantidadBoletos > 1) {
      this.cantidadBoletos--;
      this.montoTotal = this.calcularMontoTotal();
    }
  }

  private calcularMontoTotal(): number {
    if (this.evento.descuento) {
      const descuentoDecimal = this.evento.descuento / 100;
      return this.cantidadBoletos * this.evento.precio * (1 - descuentoDecimal);
    }
    return this.cantidadBoletos * this.evento.precio;
  }


  private getEventoById(id: string): void {
    this.vistaPrincipalService.getEventoById(id).pipe().subscribe((evento) => {
      if (evento) {
        this.evento = evento;
        this.montoTotal = this.calcularMontoTotal();
      } else {
        this.vistaPrincipalService.getPromoById(id).pipe().subscribe((promo) => {
          if (promo) {
            this.evento = promo;
            this.montoTotal = this.calcularMontoTotal();
          }
        });
      }
    }
    );
  }

  public agregarAlCarrito(): void {
    const descuentoDecimal = this.evento.descuento ? this.evento.descuento / 100 : 0;
    const precioConDescuento = this.evento.precio * (1 - descuentoDecimal);
    const nuevoEvento = {
      ...this.evento,
      precio: precioConDescuento,
    };

    const montoTotal = this.cantidadBoletos * precioConDescuento;
    const item = {
      evento: {
        ...nuevoEvento,
        boletos: this.cantidadBoletos,
      },
      montoTotal,
    };
    this.vistaPrincipalService.setCarritoService(item);
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
