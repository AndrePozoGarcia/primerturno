import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/prime.module';
import { AuthService } from 'src/app/modulos/login/service/auth.service';
import { RouterModule, Router } from '@angular/router';
import { ModalComponent } from 'src/app/componentes/modal/modal.component';
import { Subject, takeUntil } from 'rxjs';
import { AuthService2 } from 'src/app/core/services/auth.service';
import { VistaPrincipalService } from 'src/app/modulos/vista-principal/service/vista-principal.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
  imports: [CommonModule, RouterModule, PrimeModule, ModalComponent],
  standalone: true,
})
export class HeaderComponent {
  public isvisible: boolean;
  public destroySubject: Subject<void> = new Subject<void>();
  constructor(private authService: AuthService2,
    private router: Router,
    private vistaPrincipalService: VistaPrincipalService
  ) { }

  ngOnInit(): void {
    this.empiezaAEscuchar();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }


  public empiezaAEscuchar() {
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isAuth) => {
        this.isvisible = isAuth;

      });
  }

  public openModal(modal: ModalComponent) {
    modal.openModal();
  }

  public cerrarSesion() {
    this.vistaPrincipalService.deleteCarritoService();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public irPanelAdministracion() {
    this.router.navigate(['/panel-administracion-eventos']);
  }

  public irLogIn() {
    this.router.navigate(['/login']);
  }
}
