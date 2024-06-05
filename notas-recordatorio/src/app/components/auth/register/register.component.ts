import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: any = {};
  public users: any[] = [];
  public password: any;
  public password1 = '';
  public show = false;
  public alert_pass = false;
  public valid = false;
  public recordar = true;
  public load_register = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _title: Title,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this._title.setTitle('Registro de usuarios');
    this.password = 'password';
  }

  //Comparar contraseñas
  compare_password() {
    if (this.password1 == this.user.password) {
      this.alert_pass = false;
      this.valid = true;

    } else if (this.password1 != this.user.password) {
      this.alert_pass = true;
      this.valid = false;
    }
  }

  registrar(registroForm: any) {
    this.load_register = true;
    if (registroForm.valid) {

      let data = {
        name: this.user.nombres,
        surname: this.user.apellidos,
        email: this.user.email,
        phone: this.user.telefono,
        password: this.user.password,
      }

      this._userService.registro_user(data).subscribe({
        next: (res) => {
          localStorage.setItem('_id', res._id);
          this._toastrService.success('Se registró con éxito', 'REGISTRADO!');
          localStorage.setItem('user_email', this.user.email);
          this.load_register = false;
        },
        error: (err) => {
          this._toastrService.error(err.error.message[0], 'ERROR');
          this.load_register = false;
        },
        complete: () => {
          this._toastrService.success('Se registró con éxito', 'REGISTRADO!');
        }
      }
      );
    } else {
      this._toastrService.error('Los datos del formulario no son válidos', 'ERROR');
      this.load_register = false;
    }
  }

  onClickPass() {
    this.password = (this.password === 'password') ? 'text' : 'password';
    this.show = (this.password === 'text');
  }
}
