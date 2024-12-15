import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento.interface';
import { VistaPrincipalService } from 'src/app/modulos/vista-principal/service/vista-principal.service';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, RouterModule, PrimeModule],
  standalone: true,
})
export class ModalComponent {
  constructor(
    private vistaPrincipalService: VistaPrincipalService
  ) {}

  public visible:boolean = false;
  public total = 0;
  public eventos: Evento[] = [];

  ngOnInit() {
    this.loadEventos();
    this.vistaPrincipalService.trigger.emit(this);
  }

  loadEventos() {
    const storedData = this.vistaPrincipalService.getCarritoService();
    if (storedData) {
      this.eventos = storedData.items;
      this.total = storedData.montoTotal;
    }
  }

  openModal() {
    this.loadEventos();
    this.visible = true;
  }

  closeModal() {
    this.loadEventos();
    this.visible = false;
  }

  comprar() {
    const storedData = localStorage.getItem('carrito');
    if (storedData) {
      this.vistaPrincipalService.postCarrito(JSON.parse(storedData))
      this.closeModal();
      this.vistaPrincipalService.deleteCarritoService();
    }
  }
  
  cancelarCompra() {
    this.vistaPrincipalService.deleteCarritoService();
    this.closeModal();}

}
