import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

const appRouter: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'about-me',
        loadChildren: './about-me/about-me.module#AboutMeModule'
      },
      {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'services',
        loadChildren: './services/services.module#ServicesModule'
      },
      {
        path: 'registration',
        loadChildren: './registration/registration.module#RegistrationModule'
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
    PagesComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
