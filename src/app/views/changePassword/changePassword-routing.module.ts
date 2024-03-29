import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent} from './changePassword.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    data: {
      title: 'ChangePassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {}
