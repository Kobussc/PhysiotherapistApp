import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule, Routes, Router } from '@angular/router';

export const appRouter: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [AdminPanelComponent],
  exports: [
    RouterModule
  ]
})
export class AdminPanelModule { }
