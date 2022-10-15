import { PrivateComponent } from './private.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@public/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'password',
        loadChildren: () => import('./components/password/password.module').then(m => m.PasswordModule)
      },
      {
        path: 'group',
        loadChildren: () => import('./components/group/group.module').then(m => m.GroupModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
