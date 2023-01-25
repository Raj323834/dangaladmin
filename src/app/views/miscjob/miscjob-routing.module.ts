import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscjobComponent } from './miscjob.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Misc-Job'
    },
    children: [
      {
        path: '',
        redirectTo: 'miscjob'
      },
      {
        path: 'miscjob',
        component: MiscjobComponent,
        data: {
          title: 'Misc. Job'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscjobRoutingModule { }
