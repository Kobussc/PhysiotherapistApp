import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditorService } from './../editor.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../editor.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postList: Post[];
  data: Array<any> = [];
  finalData: Array<any> = [];
  longString: String;
  shortString: String;

  constructor(
    private editorService: EditorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const data = this.data;
    let lString = this.longString;
    let sString = this.shortString;
    const x = this.editorService.getData();
    x.snapshotChanges().subscribe(item => {
      this.data = item;
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

  onDelete(key: string) {
    if (confirm('Czy na pewno usunąć ten artykuł?') === true) {
      this.editorService.deletePost(key);
      this.toastr.warning('Usunieto artykuł', 'Rejestr artykułów');
    }
  }

  editPost(key: string) {
    this.router.navigate([`blog/editor/editPost`, {id: key}]);
  }
}
