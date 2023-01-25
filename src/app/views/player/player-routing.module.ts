import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeletePlayerComponent } from './deletePlayer/deletePlayer.component';
import { FraudPlayerComponent } from './fraudPlayer/fraud-player.component';
import { LockeduserComponent } from './lockedUser/lockuser.component';

import { ManualRegistration } from './manualRegistration/manual-registration.component';
import { PlayerDetailComponent } from './playerDetail/player-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Players'
    },
    children: [
      {
        path: '',
        redirectTo: 'player'
      },
      {
        path: 'player-detail',
        component: PlayerDetailComponent,
        data: {
          title: 'Get Player Details'
        }
      },
      {
        path: 'manual-registration',
        component: ManualRegistration,
        data: {
          title: 'Manual Registration'
        }
      },
       {
        path: 'deletePlayer',
        component: DeletePlayerComponent,
        data: {
          title: 'Delete Player'
        }
      },
      {
        path: 'lockuser',
        component: LockeduserComponent,
        data: {
          title: 'Lock Player'
        }
      },
      {
        path: 'fraudPlayer',
        component: FraudPlayerComponent,
        data: {
          title: 'Fraud Player'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
