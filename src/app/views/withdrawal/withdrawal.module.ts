import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {WithdrawalComponent } from './withdrawal-details/withdrawal.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {  WithdrawalJourneyComponent } from './withdrawal-journey/withdrawal-journey.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';
// Buttons Routing
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FindUserModule } from '../find-user/find-user.module';
import { ByPassReportsComponent } from './byass/byPassReports.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    WithdrawalRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    WithdrawalRoutingModule,
    DpDatePickerModule,
    FormsModule,
    NgxDatatableModule,
    MatCheckboxModule,
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
    FindUserModule
  ],
  declarations: [
    WithdrawalComponent,
    WithdrawalJourneyComponent,
    ByPassReportsComponent

  ]
})
export class WithdrawalModule { }
