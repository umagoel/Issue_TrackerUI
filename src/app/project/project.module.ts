import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiSelectModule} from 'primeng/multiselect';

import { ProjectRoutingModule } from './project-routing.module';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from '../shared/modules/data-table/data-table.module';
import { ProjectStore } from './project.store';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [AddEditProjectComponent, ProjectDashboardComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    MultiSelectModule,
    DropdownModule
    // BrowserAnimationsModule
  ],
  providers: [ProjectStore]
})
export class ProjectModule { }
