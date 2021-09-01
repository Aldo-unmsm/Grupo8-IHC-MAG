import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/User';

import { CommunicationService } from '../../services/communication.service';
import { UsersService } from '../../services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User = {
    int_usercodigo: 0,
    vch_userpaterno: '',
    vch_usermaterno: '',
    vch_usernombre: '',
    vch_userciudad: '',
    vch_userdireccion: '',
    vch_usertelefono: '',
    vch_userusuario: '',
    vch_userclave: '',
    boo_logsesion: false
  };

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  mensaje(titulo: string, msj: string, icono: any) {
    Swal.fire(
      titulo,
      msj,
      icono
    )
  }

  aviso(titulo: string, icono: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: icono,
      title: titulo
    })
  }

  validarCampos() {
    if (this.user.vch_userusuario == '' || this.user.vch_userclave == '') {
      this.mensaje('Campos Incompletos!', 'No puede iniciar sesion sin ingresar los campos.', 'warning');
      return false;
    } else {
      return true;
    }
  }

  login() {
    if (this.validarCampos()) {
      delete this.user.int_usercodigo;
      this.userService.validateUser(this.user.vch_userusuario!).subscribe(
        res => {
          this.userService.validatePassword(this.user.vch_userclave!).subscribe(
            res => {
              this.user = res;
              this.aviso(`Bienvenido ${this.user.vch_usernombre}!`, 'success');
              this.communicationService.UserDefiner(this.user);
              this.router.navigate(['/games']);
            },
            err => {
              this.aviso(`Contraseña Incorrecta!`, 'error');
              console.error(err);
            }
          );
        },
        err => {
          this.aviso(`Usuario Incorrecto!`, 'error');
          console.error(err);
        }
      );
    }
  }

}
