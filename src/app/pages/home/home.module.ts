import { ServicesComponent } from './../services/services.component';
import { AboutMeComponent } from './../about-me/about-me.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

export const appRouter: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
  path: 'services',
  component: ServicesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    HomeComponent,
    AboutMeComponent,
    ServicesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
