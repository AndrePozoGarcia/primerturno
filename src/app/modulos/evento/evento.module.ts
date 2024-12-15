import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoRoutingModule } from './evento-routing.module';
import { PrimeModule } from 'src/app/prime.module';
import { ModalComponent } from 'src/app/componentes/modal/modal.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventoRoutingModule,
    PrimeModule,
    ModalComponent
  ],
  exports: [
    PrimeModule,
    ModalComponent
  ]
})
export class EventoModule { }
