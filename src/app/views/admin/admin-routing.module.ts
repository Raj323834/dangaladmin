import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAdminComponent } from './users/manage-admin.component';
import { TypographyComponent } from './role/manage-role.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        redirectTo: 'manage-admin'
      },
      {
        path: 'manage-admin',
        component: ManageAdminComponent,
        data: {
          title: 'Manage Admin User'
        }
      },
      {
        path: 'manage-role',
        component: TypographyComponent,
        data: {
          title: 'Manage Roles'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
