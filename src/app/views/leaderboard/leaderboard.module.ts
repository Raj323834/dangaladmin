import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
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
import { MatExpansionModule } from '@angular/material/expansion'
import { LeaderboardWinningComponent } from '../report/leaderboardWinning/leaderboardWinning.component';

@NgModule({
  imports: [
    LeaderboardRoutingModule,
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
    MatExpansionModule
  ],
  declarations: [ LeaderboardComponent,
  LeaderboardWinningComponent],
  
})
export class LeaderboardModule { }
