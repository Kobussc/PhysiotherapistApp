import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../editor/editor.model';
import { EditorService } from '../../editor/editor.service';

@Component({
  selector: 'app-reader-post',
  templateUrl: './reader-post.component.html',
  styleUrls: ['./reader-post.component.css'],
  providers: [EditorService]
})
export class ReaderPostComponent implements OnInit {

  postId: string;
  postList: Post[];

  constructor(
    private editorService: EditorService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = window.location.href;
    this.postId = id.slice(48, 70);
    console.log(this.postId);

    const x = this.editorService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        if (element.key === this.postId) {
          this.postList.push(y as Post);
        }
        Object.getOwnPropertyNames(y).forEach(
          function (val, idx, arra) {
            if (val === 'textArea') {
            }
          }
        );
      });
    });
  }

  goToList() {
    this.router.navigate(['/blog/reader/readerList']);
  }
}
