import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${this.API_URI}/posts`);
  }

  getMyPosts(id: number) {
    return this.http.get(`${this.API_URI}/posts/MyPosts/${id}`);
  }

  getPost(id: string) {
    return this.http.get(`${this.API_URI}/posts/${id}`);
  }

  savePostGame(post: any) {
    return this.http.post(`${this.API_URI}/posts/game`, post);
  }

  savePost(post: Post) {
    return this.http.post(`${this.API_URI}/posts/`, post);
  }

  daletePost(id: string) {
    return this.http.delete(`${this.API_URI}/posts/${id}`);
  }

  updatePost(id: string|number, updatedPost: Post): Observable<Post> {
    return this.http.put(`${this.API_URI}/posts/${id}`, updatedPost);
  }

}
