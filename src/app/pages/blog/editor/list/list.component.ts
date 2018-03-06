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

  constructor(
    private editorService: EditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const data = this.data;
    const x = this.editorService.getData();
    x.snapshotChanges().subscribe(item => {
      this.data = item;
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.postList.push(y as Post);
      });
    });
  }

}
