import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ByPassReportsComponent } from './byass/byPassReports.component';

import { WithdrawalComponent } from './withdrawal-details/withdrawal.component';
import { WithdrawalJourneyComponent } from './withdrawal-journey/withdrawal-journey.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Withdrawals'
    },
    children: [
      {
        path: '',
        redirectTo: 'withdrawal'
      },
      {
        path: 'withdrawal-detail',
        component: WithdrawalComponent,
        data: {
          title: 'Withdrawal Details' 
        }
      },
      {
        path: 'withdrawal-journey',
        component: WithdrawalJourneyComponent,
        data: {
          title: 'Withdrawal Journey'
        }
      },
      {
        path: 'bypassuserreports',
        component: ByPassReportsComponent,
        data: {
          title: 'ByPass Users'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalRoutingModule {}
