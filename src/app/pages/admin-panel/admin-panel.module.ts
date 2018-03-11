import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { VisitListComponent } from './visit-list/visit-list.component';

export const appRouter: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'visit-list',
        component: VisitListComponent
      },
      {
        path: 'contact-list',
        component: ContactListComponent
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
    AdminPanelComponent,
    ContactListComponent,
    VisitListComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPanelModule { }
