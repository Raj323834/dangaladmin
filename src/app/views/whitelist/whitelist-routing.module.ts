import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WhitelistComponent} from './whitelist.component';

const routes: Routes = [
  {
    path: '',
    component: WhitelistComponent,
    data: {
      title: 'Whitelist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhitelistRoutingModule {}
