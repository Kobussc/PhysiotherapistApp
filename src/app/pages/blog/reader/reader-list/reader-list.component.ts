import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../editor/editor.model';
import { EditorService } from '../../editor/editor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrls: ['./reader-list.component.css'],
  providers: [EditorService]
})
export class ReaderListComponent implements OnInit {

  postList: Post[];
  longString: String;
  shortString: String;

  constructor(
    private editorService: EditorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let lString = this.longString;
    let sString = this.shortString;
    const x = this.editorService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.postList.push(y as Post);
        Object.getOwnPropertyNames(y).forEach(
          function (val, idx, arra) {
            if (val === 'textArea') {
              lString = y[val];
              sString = lString.substring(0, 100) + '...';
              y['textArea'] = sString;
            }
          }
        );
      });
    });
  }

  showPost(key: string) {
    this.router.navigate([`blog/reader/readerPost`, {id: key}]);
  }

}
