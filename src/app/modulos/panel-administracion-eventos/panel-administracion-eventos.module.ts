import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelAdministracionEventosRoutingModule } from './panel-administracion-eventos-routing.module';
import { TableComponent } from './components/table/table.component';
import { PrimeModule } from 'src/app/prime.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';


@NgModule({
  declarations: [
    TableComponent,
    ModalFormComponent,
    ModalInfoComponent
  ],
  exports: [
    TableComponent,
    ModalFormComponent,
    ModalInfoComponent
  ],
  imports: [
    CommonModule,
    PanelAdministracionEventosRoutingModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class PanelAdministracionEventosModule { }
