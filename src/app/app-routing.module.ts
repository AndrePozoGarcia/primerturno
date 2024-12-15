import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegisstroComponent } from './modulos/regisstro/regisstro.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./modulos/vista-principal/vista-principal.component'),
     canActivate: [AuthGuard]
  },
   { path: 'evento/:id',
    loadComponent: () => import('./modulos/evento/evento.component'),
      canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./modulos/login/login.component')
  },
  {
    path: 'regidter', component: RegisstroComponent
  },
  {
    path: 'panel-administracion-eventos',
    loadComponent: () => import('./modulos/panel-administracion-eventos/panel-administracion-eventos.component'),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
