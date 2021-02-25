import { TopNavComponent } from './../top-nav/top-nav.component';
import { DataTableModule } from './../shared/modules/data-table/data-table.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    DataTableModule,
    DashboardRoutingModule
  ],
  // exports: [TopNavComponent]
})
export class DashboardModule { }
