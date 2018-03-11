import { MyDatePickerModule } from 'mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar/calendar.component';
import { PersonalComponent } from './personal/personal.component';
import { RegistrationComponent } from './registration.component';
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
        path: 'calendar/:id',
        component: CalendarComponent
      },
      {
        path: 'personal',
        component: PersonalComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'summary/id',
        component: SummaryComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter),
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalendarComponent,
    PersonalComponent,
    RegistrationComponent,
    SummaryComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RegistrationModule { }
