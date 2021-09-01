import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from 'src/app/models/Games';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

import { GamesService } from '../../services/games.service';
import { PostsService } from '../../services/posts.service';
import { CommunicationService } from '../../services/communication.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

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

  game: Game = {
    int_usercodigo: 0,
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  post: Post = {
    int_postcodigo: 0,
    int_usercodigo: 0,
    id: 0,
    vch_postdescripcion: '',
    vch_postimagen: '',
    post_created_at: new Date()
  };

  post1 : any = {
    p_usercodigo: 0,
    p_title: '',
    p_description: '',
    p_image: ''
  }

  edit: boolean = false;

  constructor(private gamesService: GamesService, private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.user = this.communicationService.user;
    this.game.int_usercodigo = this.user.int_usercodigo;
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gamesService.getGame(params.id).subscribe(
        res => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  validarCampos() {
    if (this.game.title == '' || this.game.description == '' || this.game.image == '') {
      Swal.fire(
        'Campos Incompletos!',
        'Complete los campos porfavor',
        'warning'
      )
      return false;
    } else {
      return true;
    }
  }

  saveNewGame() {
    if (this.validarCampos()) {
      this.post1.p_usercodigo= this.game.int_usercodigo;
      this.post1.p_title= this.game.title;
      this.post1.p_description= this.game.description;
      this.post1.p_image= this.game.image;
      console.log(this.post1);
      this.postsService.savePostGame(this.post1).subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Guardado!',
            'Juego guardado correctamente :D',
            'success'
          )
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
    }
  }

  updateGame() {
    if (this.validarCampos()) {
      Swal.fire({
        title: 'Esta seguro de EDITAR?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, editalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.gamesService.updateGame(String(this.game.id), this.game).subscribe(
            res => {
              console.log(res);
              Swal.fire(
                'Editado!',
                'Juego editado correctamente :D',
                'success'
              )
              this.router.navigate(['/games']);
            },
            err => console.error(err)
          );
        }
      })
    }
  }

  cancel() {
    this.router.navigate(['/games']);
  }

}
