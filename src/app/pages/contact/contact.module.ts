import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';

const appRouter: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    ContactComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // ContactService
  ]
})
export class ContactModule { }
