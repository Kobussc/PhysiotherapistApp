import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ReaderComponent } from './reader.component';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderPostComponent } from './reader-post/reader-post.component';

export const appRouter: Routes = [
  {
    path: 'readerList',
    component: ReaderListComponent,
    children: [
      // {
      //   path: 'readerList',
      //   component: ReaderListComponent
      // },
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
    // ReaderComponent,
    ReaderListComponent,
    ReaderPostComponent
  ],
  exports: [RouterModule]
})
export class ReaderModule { }
