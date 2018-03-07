import { Post } from './editor.model';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EditorService {

  postList: AngularFireList<any>;
  selectedPost: Post = new Post();

  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.postList = this.firebase.list('post');
    return this.postList;
  }

  insertPost(post: Post) {
    this.postList = this.firebase.list('post');
    const newPostRef = this.postList.push({
      name: post.name,
      textArea: post.textArea,
      title: post.title
    });
  }

  deletePost($key: string) {
    this.postList.remove($key);
  }

}
