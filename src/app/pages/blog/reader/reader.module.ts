import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ReaderComponent } from './reader.component';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderPostComponent } from './reader-post/reader-post.component';
import { ReaderComponent } from './reader.component';

export const appRouter: Routes = [
  {
    path: '',
    component: ReaderComponent,
    children: [
      {
        path: 'readerList',
        component: ReaderListComponent
      },
      {
        path: 'readerPost',
        component: ReaderPostComponent
      },
      {
        path: 'readerPost/:id',
        component: ReaderPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    ReaderComponent,
    ReaderListComponent,
    ReaderPostComponent
  ],
  exports: [RouterModule]
})
export class ReaderModule { }
