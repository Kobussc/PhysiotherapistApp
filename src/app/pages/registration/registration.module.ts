import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PersonalComponent } from './personal/personal.component';
import { SummaryComponent } from './summary/summary.component';

export const appRouter: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'personal',
        component: PersonalComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter),
    ReactiveFormsModule
  ],
  declarations: [RegistrationComponent, CalendarComponent, PersonalComponent, SummaryComponent],
  exports: [
    RouterModule
  ]
})
export class RegistrationModule { }
