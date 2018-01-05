import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';

const appRouter: Routes = [
  {
    path: '',
    component: BlogComponent
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
    // BlogService,
  ]
})
export class BlogModule { }
