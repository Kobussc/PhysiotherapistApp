import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';

export const appRouter: Routes = [
  {
    path: '',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter),
    ReactiveFormsModule
  ],
  declarations: [RegistrationComponent],
  exports: [
    RouterModule
  ]
})
export class RegistrationModule { }
