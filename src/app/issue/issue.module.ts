import { FormsModule } from '@angular/forms';
import { IssueRoutingModule } from './issue-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { CalendarModule } from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { IssueListComponent } from './issue-list/issue-list.component';


@NgModule({
  declarations: [AddIssueComponent, IssueListComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    FormsModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule
  ]
})
export class IssueModule { }
