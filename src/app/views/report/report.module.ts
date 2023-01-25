// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



// Components Routing
import { ReportRoutingModule } from './report-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { WithdrawalReportComponent } from './withdrawal/withdrawalReport.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IPReportComponent } from './ip/ipReport.component';
import { WinningReportComponent } from './winning/winningReport.component';
import { HandsPlayedTogetherReportComponent } from './handsPlayedTogether/handsPlayedTogetherReport.component';
import { AdminActivityReportComponent } from './adminActivityReport/adminActivityReport.component';
import { TransactionHistoryComponent } from './transactionhistory/transactionHistory.component';
import { RafReportsComponent } from './raf/rafReports.component';
import { UserRegistrationsComponent } from './userRegistration/userRegistrations.component';
import { FreeGameReportsComponent } from './freeGame/freeGameReports.component';
import { CashGameReportsComponent } from './cashgame/cashGameReports.component';
import { DepositReportComponent } from './deposit/depositReport.component';
import { OverviewReportComponent } from './overView/overviewReport.component';
import { DailyStatsReportsComponent } from './dailyStats/dailyStatsReports.component';
import { SuspiciousReportsComponent } from './suspicious/ suspiciousReports.component';
import { FraudReportComponent } from './fraud/fraudReport.component';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { PokerToDgTransferReportComponent } from './pokerToDg/pokerToDgReport.component';
import { DgToPokerTransferReportComponent } from './dgToPoker/dgToPokerReport.component';
import { TdsReportComponent } from './tds/tdsReport.component';
import { FindUserModule } from '../find-user/find-user.module';
import { SnapshotReportsComponent } from './snapshot/snapshotReports.component';
import { TournamentReportsComponent } from './tournament/tournamentReports.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RummyTournamemtComponent } from './rummy-tournamemt/rummy-tournamemt.component';
import { CallbreakgamestatsComponent } from './callbreakgamestats/callbreakgamestats.component';
import { CallbreaklogComponent } from './callbreaklog/callbreaklog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OpponentplayedtogetherreportComponent } from './opponentplayedtogetherreport/opponentplayedtogetherreport.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    NgxSpinnerModule,
    UserDetailModule,
    FindUserModule,
    OverlayModule,
    MatExpansionModule

  ],
  declarations: [
    DepositReportComponent,
    DailyStatsReportsComponent,
    OverviewReportComponent,
    WithdrawalReportComponent,
    CashGameReportsComponent,
    FreeGameReportsComponent,
    RafReportsComponent,
    UserRegistrationsComponent,
    TransactionHistoryComponent,
    IPReportComponent,
    WinningReportComponent,
    HandsPlayedTogetherReportComponent,
    AdminActivityReportComponent,
    SuspiciousReportsComponent,
    FraudReportComponent,
    PokerToDgTransferReportComponent,
    DgToPokerTransferReportComponent,
    TdsReportComponent,
    SnapshotReportsComponent,
    TournamentReportsComponent,
    RummyTournamemtComponent,
    CallbreakgamestatsComponent,
    CallbreaklogComponent,
    OpponentplayedtogetherreportComponent,

  ]
})
export class ReportModule { }
