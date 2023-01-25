import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoindealsComponent } from './coindeals/coindeals.component';
import { CoinhomeComponent } from './coinhome/coinhome.component';
import { DealbannerdangalgamesComponent } from './dealbannerdangalgames/dealbannerdangalgames.component';
import { DealbannerplaystoreComponent } from './dealbannerplaystore/dealbannerplaystore.component';
import { HomebannerdangalgameComponent } from './homebannerdangalgame/homebannerdangalgame.component';
import { HomebannerplaystoreComponent } from './homebannerplaystore/homebannerplaystore.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Banners'
    },
    children: [
      {
        path: '',
        redirectTo: 'banner'
      },
      {
        path: 'homebannerdangalgame',
        component: HomebannerdangalgameComponent,
        data: {
          title: 'Home Page Banner DangalGames'
        }
      },
      {
        path: 'homebannerplaystore',
        component: HomebannerplaystoreComponent,
        data: {
          title: 'Home Page Banner Playstore'
        }
      },
       {
        path: 'dealbannerdangalgames',
        component: DealbannerdangalgamesComponent,
        data: {
          title: 'Deal Page Banner DangalGames'
        }
      },
      {
        path: 'dealbannerplaystore',
        component: DealbannerplaystoreComponent,
        data: {
          title: 'Deal page Banner Playstore'
        }
      },
      {
        path: 'coinbannerhome',
        component: CoinhomeComponent,
        data: {
          title: 'Home page Banner Coin'
        }
      },
      {
        path: 'coinbannerdeals',
        component: CoindealsComponent,
        data: {
          title: 'Deal page Banner Coin'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
