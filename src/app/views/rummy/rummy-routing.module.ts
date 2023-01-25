import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RummyComponent} from './rummy.component';

const routes: Routes = [
  {
    path: '',
    component:RummyComponent,
    data: {
      title: 'Rummy'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RummyRoutingModule {}
