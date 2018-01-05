import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRouter: Routes = [
  {
    path: '',
    component: ServicesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    ServicesComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ServicesService,
  ]
})
export class ServicesModule { }
