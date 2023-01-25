import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameorderComponent } from './gameorder.component';

const routes: Routes = [
  {
    path: '',
    component: GameorderComponent,
    data: {
      title: 'Game Order'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameorderRoutingModule {}
