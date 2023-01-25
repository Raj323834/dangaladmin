import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BonusComponent } from './bonus.component';
import { BonusRoutingModule } from './bonus-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';  
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'


@NgModule({
  imports: [
    BonusRoutingModule,
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
    NgxSpinnerModule,
    UserDetailModule,
    MatExpansionModule,
    BsDatepickerModule.forRoot(),
    CommonModule

  ],
  declarations: [ BonusComponent ]
})
export class BonusModule { }
