import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuration'
    },
    children: [
      {
        path: '',
        redirectTo: 'configuration'
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
        data: {
          title: 'Configuration'
        }
      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
