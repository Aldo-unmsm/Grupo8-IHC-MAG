import { Component, HostBinding, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';

import { GamesService } from '../../services/games.service';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { CommunicationService } from '../../services/communication.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];
  posts: any = [];
  usuarios: any = [];

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

  constructor(private gamesService: GamesService, private postsService: PostsService, private usersService: UsersService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.user = this.communicationService.user;
    this.getGames();
    this.getPosts();
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      res => {
        this.usuarios = res;
      },
      err => console.error(err)
    );
  }

  getGames() {
    this.gamesService.getMyGames(this.user.int_usercodigo!).subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
    );
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      res => {
        this.posts = res;
        this.posts.reverse();
      },
      err => console.error(err)
    );
  }

  deleteGame(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de ELIMINAR el Juego?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.gamesService.daleteGame(id).subscribe(
          res => {
            console.log(res);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Tu juego fue eliminado :(',
              'success'
            )
            this.getGames();
          },
          err => console.error(err)
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Eliminacion Cancelada',
          'Tu juego esta a salvo :)',
          'error'
        )
      }
    })
  }

}
