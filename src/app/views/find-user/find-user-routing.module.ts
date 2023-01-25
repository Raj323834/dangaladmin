import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindUserComponent } from './find-user.component';
const routes: Routes = [
  {
    path: '',
    component: FindUserComponent,
    data: {
      title: 'FindUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindUserRoutingModule {}
