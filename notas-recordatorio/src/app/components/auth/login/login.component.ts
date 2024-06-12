import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public password: any;
  public recordar = true;
  public load_login = false;
  public show = false;

  constructor(
    private _title: Title,
    private _userService: UserService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Iniciar sesion');
    this.password = 'password';
  }

  login(loginForm: any) {
    this.load_login = true;
    if (loginForm.valid) {

      let data = {
        email: this.user.email,
        password: this.user.password,
      }

      this._userService.login_user(data).subscribe({
        next: (res) => {
          console.log(res);
          
          localStorage.setItem('_id', res.user._id);
          localStorage.setItem('token', res.token);
          this.load_login = false;
          this._toastrService.success('Iniciado', 'Confirmado!');
        },
        error: (err) => {
          this._toastrService.error(err.error.message[0], 'ERROR');
          this.load_login = false;
        }
      }
      );
    } else {
      this._toastrService.error('Los datos del formulario no son válidos', 'ERROR');
      this.load_login = false;
    }
  }

  onClickPass() {
    this.password = (this.password === 'password') ? 'text' : 'password';
    this.show = (this.password === 'text');
  }

}
