import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBalanceComponent } from './updateBalance.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateBalanceComponent,
    data: {
      title: 'Update Balance'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateBalanceRoutingModule {}
