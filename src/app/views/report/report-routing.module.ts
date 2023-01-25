import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStatsReportsComponent } from './dailyStats/dailyStatsReports.component';
import { OverviewReportComponent } from './overView/overviewReport.component';

import { CashGameReportsComponent } from './cashgame/cashGameReports.component';
import { FreeGameReportsComponent } from './freeGame/freeGameReports.component';
import { RafReportsComponent } from './raf/rafReports.component';
import { UserRegistrationsComponent } from './userRegistration/userRegistrations.component';
import { TransactionHistoryComponent } from './transactionhistory/transactionHistory.component';
import { WithdrawalReportComponent } from './withdrawal/withdrawalReport.component';
import { DepositReportComponent } from './deposit/depositReport.component';
import { IPReportComponent } from './ip/ipReport.component';
import { WinningReportComponent } from './winning/winningReport.component';
import { HandsPlayedTogetherReportComponent } from './handsPlayedTogether/handsPlayedTogetherReport.component';
import { AdminActivityReportComponent } from './adminActivityReport/adminActivityReport.component';
import { SuspiciousReportsComponent } from './suspicious/ suspiciousReports.component';
import { FraudReportComponent } from './fraud/fraudReport.component';
import { PokerToDgTransferReportComponent } from './pokerToDg/pokerToDgReport.component';
import { DgToPokerTransferReportComponent } from './dgToPoker/dgToPokerReport.component';
import { TdsReportComponent } from './tds/tdsReport.component';
import { from } from 'rxjs';
import { ByPassReportsComponent } from '../withdrawal/byass/byPassReports.component';
import { LeaderboardWinningComponent } from './leaderboardWinning/leaderboardWinning.component';
import { SnapshotReportsComponent } from './snapshot/snapshotReports.component';
import { TournamentReportsComponent } from './tournament/tournamentReports.component';
import { RummyTournamemtComponent } from './rummy-tournamemt/rummy-tournamemt.component';
import { CallbreakgamestatsComponent } from './callbreakgamestats/callbreakgamestats.component';
import { CallbreaklogComponent } from './callbreaklog/callbreaklog.component';
import { OpponentplayedtogetherreportComponent } from './opponentplayedtogetherreport/opponentplayedtogetherreport.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        redirectTo: 'depositReport'
      },
      {
        path: 'depositReport',
        component: DepositReportComponent,
        data: {
          title: 'Deposit Report'
        }
      },
      {
        path: 'CallbreakGameLogs',
        component: CallbreaklogComponent,
        data: {
          title: 'Callbreak Game Logs' 
        }
      },
      {
        path: 'callbreakgamestats',
        component: CallbreakgamestatsComponent,
        data: {
          title: 'Call Break Game Stats' 
        }
      },
      {
        path: 'cashGameReports',
        component: CashGameReportsComponent,
        data: {
          title: 'Cash Game Reports'
        }
      },
      {
        path: 'freeGameReports',
        component: FreeGameReportsComponent,
        data: {
          title: 'Free Game Reports'
        }
      },
      {
        path: 'dailyStatsReports',
        component: DailyStatsReportsComponent,
        data: {
          title: 'Daily Stats Report'
        }
      },

     {
        path: 'suspiciousReports',
        component: SuspiciousReportsComponent,
        data: {
          title: 'Suspicious Report'
        }
      },

      {
        path: 'fraudReport',
        component: FraudReportComponent,
        data: {
          title: 'Fraud Report'
        }
      },
      {
        path: 'pokerToDgTransferReport',
        component: PokerToDgTransferReportComponent,
        data: {
          title: 'Poker To DG Transfer Report'
        }
      },
      {
        path: 'dgToPokerTransferReport',
        component: DgToPokerTransferReportComponent,
        data: {
          title: 'DG To Poker Transfer Report'
        }
      },
      {
        path: 'tdsReport',
        component: TdsReportComponent,
        data: {
          title: 'TDS Report'
        }
      },
      {
        path: 'rafReports',
        component: RafReportsComponent,
        data: {
          title: 'RAF Reports'
        }
      },
      {
        path: 'userRegistrations',
        component: UserRegistrationsComponent,
        data: {
          title: 'User Registrations'
        }
      },
     
      {
        path: 'leaderboardWinning',
        component: LeaderboardWinningComponent,
        data: {
          title: 'Leaderboard Winning'
        }
      },
      {
        path: 'snapshotReports',
        component: SnapshotReportsComponent,
        data: {
          title: 'Snapshot Reports'
        }
      },
      {
        path: 'tournamentReports',
        component: TournamentReportsComponent,
        data: {
          title: 'Poker Tournament Reports'
        }
      },
      {
        path: 'rummyTournamentReports',
        component: RummyTournamemtComponent,
        data: {
          title: 'Rummy Tournament Reports'
        }
      },
      {
        path: 'withdrawalReport',
        component: WithdrawalReportComponent,
        data: {
          title: 'Withdrawal Report'
        }
      },
      {
        path: 'overviewReport',
        component: OverviewReportComponent,
        data: {
          title: 'Overview Report'
        }
      },
      
     
      {
        path: 'transactionHistory',
        component: TransactionHistoryComponent,
        data: {
          title: 'Transaction History'
        }
      },
      {
        path: 'ipReport',
        component: IPReportComponent,
        data: {
          title: 'IP Report'
        }
      },
      {
        path: 'winningReport',
        component: WinningReportComponent,
        data: {
          title: 'Winning Report'
        }
      },
      {
        path: 'handsPlayedTogetherReport',
        component: HandsPlayedTogetherReportComponent,
        data: {
          title: 'Hands Played Together Report'
        }
      },
      {
        path: 'adminActivityReport',
        component: AdminActivityReportComponent,
        data: {
          title: 'Admin Activity Report'
        }
      },
      {
        path: 'opponentPlayedTogetherReport',
        component: OpponentplayedtogetherreportComponent,
        data: {
          title: 'Opponent Played Together Report'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
