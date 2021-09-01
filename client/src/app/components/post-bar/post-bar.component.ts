import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from 'src/app/models/Post';

import { PostsService } from '../../services/posts.service';
import { CommunicationService } from '../../services/communication.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-bar',
  templateUrl: './post-bar.component.html',
  styleUrls: ['./post-bar.component.css']
})
export class PostBarComponent implements OnInit {

  post: Post = {
    int_postcodigo: 0,
    int_usercodigo: 0,
    id: 0,
    vch_postdescripcion: '',
    vch_postimagen: '',
    post_created_at: new Date()
  };

  constructor(private postsService: PostsService, private communicationService: CommunicationService, private router: Router) { }

  ngOnInit(): void {
  }

  validarCampos() {
    if (this.post.vch_postdescripcion == '') {
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

  publish() {
    if (this.validarCampos()) {
      delete this.post.int_postcodigo;
      delete this.post.id;
      delete this.post.post_created_at;
      if (this.post.vch_postimagen=='') {
        delete this.post.vch_postimagen;
      }
      this.post.int_usercodigo = this.communicationService.user.int_usercodigo;
      console.log(this.post);
      this.postsService.savePost(this.post).subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Publicado!',
            '',
            'success'
          )
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
    }
  }

}
