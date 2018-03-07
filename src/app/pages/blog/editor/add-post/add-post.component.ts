import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EditorService } from '../editor.service';
import { Post } from '../editor.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  selectedPost: Post = new Post();

  constructor(
    private editorService: EditorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addPostForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      textArea: ['', Validators.required]
    });
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

  save() {
    this.markAsTouched(this.addPostForm);
    if (!this.addPostForm.valid) {
      this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
    } else {
      this.toastr.success('Pomyślnie dodano post');
      this.editorService.insertPost(this.addPostForm.value);
      this.buildForm();
    }
    }
  }
