import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { CalendarComponent } from './calendar/calendar.component';

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
  declarations: [RegistrationComponent, CalendarComponent],
  exports: [
    RouterModule
  ]
})
export class RegistrationModule { }
