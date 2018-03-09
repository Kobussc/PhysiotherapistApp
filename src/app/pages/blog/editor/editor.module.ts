import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditorComponent } from './editor.component';
import { ListComponent } from './list/list.component';

import { EditorService } from './editor.service';

export const appRouter: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      {
        path: 'addPost',
        component: AddPostComponent
      },
      {
        path: 'editPost',
        component: EditPostComponent
      },
      {
        path: 'editPost/:id',
        component: EditPostComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRouter),
    ReactiveFormsModule
  ],
  declarations: [
    EditorComponent,
    EditPostComponent,
    AddPostComponent,
    ListComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EditorService
  ]
})
export class EditorModule { }
