import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

export const appRouter: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [HomeComponent],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
