import { AboutMeComponent } from './about-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const appRouter: Routes = [
  {
    path: '',
    component: AboutMeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    AboutMeComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ServicesService,
  ]
})
export class AboutMeModule { }
