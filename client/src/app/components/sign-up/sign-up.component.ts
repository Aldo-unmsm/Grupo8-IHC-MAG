import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/User';

import { CommunicationService } from '../../services/communication.service';
import { UsersService } from '../../services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
    if (this.user.vch_userciudad == '' || this.user.vch_userclave == '' || this.user.vch_userdireccion == '' || this.user.vch_usermaterno == '' || this.user.vch_usernombre == '' || this.user.vch_userpaterno == '' || this.user.vch_usertelefono == '' || this.user.vch_userusuario == '') {
      this.mensaje('Campos Incompletos!', 'No puede iniciar sesion sin ingresar los campos.', 'warning');
      return false;
    } else {
      return true;
    }
  }

  // registrer() {
  //   if (this.validarCampos()) {
  //     this.userService.saveUser(this.user).subscribe(
  //       res => {
  //         this.user = res;
  //         this.aviso(`Bienvenido ${this.user.vch_usernombre}!`, 'success');
  //         this.communicationService.UserDefiner(this.user);
  //         this.router.navigate(['/games']);
  //       },
  //       err => {
  //         this.aviso(`Usuario Incorrecto!`, 'error');
  //         console.error(err);
  //       }
  //     );
  //   }
  // }
  registrer() {
    if (this.validarCampos()) {
      this.userService.saveUser(this.user).subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Guardado!',
            'Usuario guardado correctamente :D',
            'success'
          )
          this.router.navigate(['/signin']);
        },
        err => console.error(err)
      );
    }
  }

}
