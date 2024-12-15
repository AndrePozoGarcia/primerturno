import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaPrincipalRoutingModule } from './vista-principal-routing.module';
import { ModalComponent } from 'src/app/componentes/modal/modal.component';
import { PrimeModule } from 'src/app/prime.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VistaPrincipalRoutingModule,
    PrimeModule,
    ModalComponent
  ],
  exports: [
    PrimeModule,
    ModalComponent
  ]
})
export class VistaPrincipalModule { }
