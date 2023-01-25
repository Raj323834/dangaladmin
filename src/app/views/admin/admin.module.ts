// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {  ManageAdminComponent } from './users/manage-admin.component';
import { TypographyComponent } from './role/manage-role.component';

// Theme Routing
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,    
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
    MatCheckboxModule
   
  ],
  declarations: [
    ManageAdminComponent,
    TypographyComponent,
    

  ]
})
export class AdminModule { }
