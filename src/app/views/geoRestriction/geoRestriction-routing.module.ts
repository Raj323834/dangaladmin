import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoRestrictionComponent} from './geoRestriction.component';

const routes: Routes = [
  {
    path: '',
    component: GeoRestrictionComponent,
    data: {
      title: 'GeoRestriction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoRestrictionRoutingModule {}
