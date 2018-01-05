import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

export const appRouter: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouter)
  ],
  exports: [
    RouterModule,
  ]
})

export class RoutingModule {
  constructor(router: Router) { }
}
