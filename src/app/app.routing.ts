import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuardService } from './services/AuthGuardService';
import { DefaultLayoutComponent } from './views/default-layout';
import { ChangePasswordComponent } from './views/changePassword/changePassword.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
 

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'report',
        loadChildren: () => import('./views/report/report.module').then(m => m.ReportModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'withdrawal',
        loadChildren: () => import('./views/withdrawal/withdrawal.module').then(m => m.WithdrawalModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'bonus',
        loadChildren: () => import('./views/bonus/bonus.module').then(m => m.BonusModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'updateBalance',
        loadChildren: () => import('./views/updateBalance/updateBalance.module').then(m => m.UpdateBalanceModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'leaderboard',
        loadChildren: () => import('./views/leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'rummy',
        loadChildren: () => import('./views/rummy/rummy.module').then(m => m.RummyModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'geoRestriction',
        loadChildren: () => import('./views/geoRestriction/geoRestriction.module').then(m => m.GeoRestrictionModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'whitelist',
        loadChildren: () => import('./views/whitelist/whitelist.module').then(m => m.WhitelistModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'changePassword',
        loadChildren: () => import('./views/changePassword/changePassword.module').then(m => m.ChangePasswordModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'gameorder',
        loadChildren: () => import('./views/gameorder/gameorder.module').then(m => m.GameorderModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'kyc',
        loadChildren: () => import('./views/kyc/kyc.module').then(m => m.KycModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'player',
        loadChildren: () => import('./views/player/player.module').then(m => m.PlayerModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'banner',
        loadChildren: () => import('./views/banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'configuration',
        loadChildren: () => import('./views/configuration/configuration.module').then(m => m.ConfigurationModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'miscjob',
        loadChildren: () => import('./views/miscjob/miscjob.module').then(m => m.MiscjobModule),
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
