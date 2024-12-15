import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/prime.module';
import { hasEmailError, isRequired } from 'src/app/utils/validators';
import { AuthService } from './service/auth.service';
import { MessageService } from 'primeng/api';
import { AuthService2 } from 'src/app/core/services/auth.service';

interface FormLogin {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, PrimeModule, ReactiveFormsModule],
  providers: [AuthService, MessageService],
})
export default class LoginComponent {
  public loginForm: FormGroup<FormLogin>;

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.loginForm);
  }

  isEmailRequired() {
    return hasEmailError(this.loginForm);
  }

  constructor(private fb: FormBuilder,
   private authService: AuthService,
   private authService2: AuthService2,
    private messageService: MessageService,
    private router: Router)
    {
    this.loginForm = this.fb.group<FormLogin>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        let data = await this.authService.login({ email, password });
        this.messageService.add({
          severity: 'success',
          summary: 'Inicio de sesión exitoso',
          life: 3000,
        });
        let token: any = data.user;
        this.authService.iniciarSesion(token);
        this.authService2.login(token);
        this.router.navigate(['/inicio']);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al iniciar sesión',
          life: 3000,
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuario o contraseña incorrectos',
        life: 3000,
      });
    }
  }
}
