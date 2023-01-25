import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Leaderboard } from '../../models/leaderboard/Leaderboard';
import { LeaderboardWinningComponent } from '../report/leaderboardWinning/leaderboardWinning.component';

import { LeaderboardComponent} from './leaderboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Leaderboard'
    },
    children: [
      {
        path: '',
        redirectTo: 'leaderboard'
      },
      {
        path: 'leaderboards',
        component: LeaderboardComponent,
        data: {
          title: 'Leaderboards' 
        }
      },
      {
        path: 'leaderboardWinning',
        component: LeaderboardWinningComponent,
        data: {
          title: 'Leaderboard Winning'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {}
