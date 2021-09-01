import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CommunicationService } from '../../services/communication.service';
import { UsersService } from '../../services/users.service';

import { User } from 'src/app/models/User';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

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

  constructor(private communicationService: CommunicationService, private usersService: UsersService, private router: Router, public translate: TranslateService) {
    this.user = this.communicationService.user;
  }

  ngOnInit(): void {

  }

  logout() {
    console.log(this.user);
    this.communicationService.user.boo_logsesion=false;
    this.usersService.updateUser(String(this.user.int_usercodigo), this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/welcome']);
      },
      err => console.error(err)
    );

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Hasta luego, te esperamos! <i class="far fa-smile-wink"> </i>'
    })
    // logout
  }

  CambiarIdiomaEs() {
    this.translate.use('es');
  }

  CambiarIdiomaEn() {
    this.translate.use('en');
  }

}
