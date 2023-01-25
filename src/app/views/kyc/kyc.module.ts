import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IconModule } from '@coreui/icons-angular';

import {KycDetailComponent } from './kyc-detail/kyc-detail.component';
import {  ManualKycComponent } from './manual-kyc/manual-kyc.component';
import { SimpleLineIconsComponent } from './simple-line-icons.component';

import { IconsRoutingModule } from './kyc-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { KycJourneyComponent } from './kyc-journey/kyc-journey.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { FindUserModule } from '../find-user/find-user.module';

@NgModule({
  imports: [
    CommonModule,
    IconsRoutingModule,
    IconModule,  
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    MatCardModule,
    NgxSpinnerModule,
    UserDetailModule,
    FindUserModule
  ],
  declarations: [
    KycDetailComponent,
    KycJourneyComponent,
    ManualKycComponent,
    SimpleLineIconsComponent

  ]
})
export class KycModule { }
