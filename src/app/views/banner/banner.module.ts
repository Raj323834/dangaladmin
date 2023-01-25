import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

//component 
import { BannerRoutingModule } from './banner-routing.module';
import { HomebannerplaystoreComponent } from './homebannerplaystore/homebannerplaystore.component';
import { HomebannerdangalgameComponent } from './homebannerdangalgame/homebannerdangalgame.component';
import { DealbannerplaystoreComponent } from './dealbannerplaystore/dealbannerplaystore.component';
import { DealbannerdangalgamesComponent } from './dealbannerdangalgames/dealbannerdangalgames.component';
import { CoinhomeComponent } from './coinhome/coinhome.component';
import { CoindealsComponent } from './coindeals/coindeals.component';


@NgModule({
  declarations: [
    HomebannerplaystoreComponent,
    HomebannerdangalgameComponent,
    DealbannerplaystoreComponent,
    DealbannerdangalgamesComponent,
    CoinhomeComponent,
    CoindealsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BannerRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    NgxSpinnerModule,
    OverlayModule,
  
  ]
})
export class BannerModule { }
