import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { WhitelistComponent } from './whitelist.component';
import { WhitelistRoutingModule } from './whitelist-routing.module';
import { FindUserComponent } from '../find-user/find-user.component';
import { FindUserModule } from '../find-user/find-user.module';

@NgModule({
  imports: [
    WhitelistRoutingModule,
    ChartsModule,
    BsDropdownModule,
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
    MatCheckboxModule,
    CommonModule,
    NgxSpinnerModule,
    UserDetailModule,
    FindUserModule

  ],
  declarations: [ WhitelistComponent ]
})
export class WhitelistModule { }
