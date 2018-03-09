import { addMessage } from './../../../../../../functions/src/index';
import { ToastrService } from 'ngx-toastr';
import { Post } from './../editor.model';
import { EditorService } from './../editor.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, NgForm, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  addPostForm: FormGroup;
  selectedPost: Post = new Post();
  postId: string;
  postList: Post[];
  textArea: string;
  title: string;
  name: string;

  constructor(
    private editorService: EditorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    let tArea = this.textArea;
    let title1 = this.title;
    let name1 = this.name;
    const postForm = this.addPostForm;
    const id = window.location.href;
    this.postId = id.slice(46, 70);

    const x = this.editorService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        if (element.key === this.postId) {
          postForm.patchValue({$key: element.key});
          Object.getOwnPropertyNames(y).forEach(
            function (val, idx, arra) {
              if (val === 'textArea') {
                tArea = y[val];
                postForm.patchValue({textArea: tArea});
              } else if (val === 'title') {
                title1 = y[val];
                postForm.patchValue({title: title1});
              } else if (val === 'name') {
                name1 = y[val];
                postForm.patchValue({name: name1});
              }
            }
          );
        }
      });
    });
  }

  buildForm() {
    this.addPostForm = this.fb.group({
      $key: ['', Validators.required],
      name: ['', Validators.required],
      title: ['', Validators.required],
      textArea: ['', Validators.required]
    });
  }

  goToList() {
    this.router.navigate(['/blog/editor/addPost']);
  }

  markAsTouched(fg: AbstractControl) {
    if (fg instanceof FormGroup) {
      for (const key in fg.controls) {
        if (fg.controls.hasOwnProperty(key)) {
          this.markAsTouched(fg.controls[key]);
        }
      }
    } else {
      fg.markAsTouched();
    }
  }

  update() {
    this.markAsTouched(this.addPostForm);
    if (!this.addPostForm.valid) {
      this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
    } else {
      this.editorService.updatePost(this.addPostForm.value);
      this.toastr.success('Pomyślnie zaktualizowano artykuł');
      this.router.navigate(['/blog/editor/addPost']);
    }
  }
}
