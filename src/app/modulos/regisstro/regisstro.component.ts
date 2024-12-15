import { Component } from '@angular/core';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-regisstro',
  templateUrl: './regisstro.component.html',
  styleUrls: ['./regisstro.component.css']
})
export class RegisstroComponent {
  registerUser: any = {
    email: '',
    password: ''
  };

  /**constructor(private authService: AuthService) {}
  register(registerUser:any){
    this.authService.register(registerUser.email, registerUser.pass)
  }*/
}
