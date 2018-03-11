import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog.component';

const appRouter: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'editor',
        loadChildren: './editor/editor.module#EditorModule'
      },
      {
        path: 'reader',
        loadChildren: './reader/reader.module#ReaderModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    BlogComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class BlogModule { }
