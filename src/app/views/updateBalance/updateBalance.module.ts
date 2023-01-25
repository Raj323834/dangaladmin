import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';  
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UpdateBalanceRoutingModule } from './updateBalance-routing.module';
import { UpdateBalanceComponent } from './updateBalance.component';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { FindUserModule } from '../find-user/find-user.module';

@NgModule({
  imports: [
    UpdateBalanceRoutingModule,
    ChartsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    DpDatePickerModule,
    MatCheckboxModule,
    UserDetailModule,
    FindUserModule
  ],
  declarations: [ UpdateBalanceComponent ]
})
export class UpdateBalanceModule { }
