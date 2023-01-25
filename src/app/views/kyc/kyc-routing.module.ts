import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  KycJourneyComponent } from './kyc-journey/kyc-journey.component';
import {  ManualKycComponent } from './manual-kyc/manual-kyc.component';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';
import { AuthGuardService } from '../../services/AuthGuardService';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'KYC'
    },
    children: [
      {
        path: '',
        redirectTo: 'kyc-detail',
        canActivate: [AuthGuardService]
      },
      {
        path: 'kyc-detail',
        component: KycDetailComponent,
        data: {
          title: 'KYC Details'
        }
      },
      {
        path: 'kyc-journey',
        component: KycJourneyComponent,
        data: {
          title: 'KYC Journey'
        }
      },
      {
        path: 'manual-kyc',
        component: ManualKycComponent,
        data: {
          title: 'Manual KYC'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {}
