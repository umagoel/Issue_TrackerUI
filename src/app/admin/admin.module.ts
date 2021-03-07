import { DataTableModule } from './../shared/modules/data-table/data-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { IssueTypeComponent } from './issue-type/issue-type.component';
import { IssueStatusComponent } from './issue-status/issue-status.component';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { UsersComponent } from './users/users.component';
import { AddIssueTypeComponent } from './issue-type/add-issue-type/add-issue-type.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, IssueTypeComponent, IssueStatusComponent, ProjectCategoryComponent, UsersComponent, AddIssueTypeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTableModule,
    NgbModalModule,
    ReactiveFormsModule

  ]
})
export class AdminModule { }
