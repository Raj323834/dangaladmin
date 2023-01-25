// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

import { ManualRegistration } from './manualRegistration/manual-registration.component';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxSpinnerModule } from 'ngx-spinner';


// Notifications Routing
import { PlayerRoutingModule } from './player-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PlayerDetailComponent } from './playerDetail/player-detail.component';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { MatExpansionModule } from '@angular/material/expansion'
import { DeletePlayerComponent } from './deletePlayer/deletePlayer.component';
import { FindUserModule } from '../find-user/find-user.module';
import { LockeduserComponent } from './lockedUser/lockuser.component';
import { FraudPlayerComponent } from './fraudPlayer/fraud-player.component';


@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
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
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    UserDetailModule,
    FindUserModule,
    MatExpansionModule,
    NgxSpinnerModule
  ],
  declarations: [
    PlayerDetailComponent,
    ManualRegistration,
    DeletePlayerComponent,
    LockeduserComponent,
    FraudPlayerComponent

  ]
})
export class PlayerModule { }
