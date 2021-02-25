
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';



@NgModule({
  imports: [CommonModule, NgxDatatableModule, FormsModule,SharedModule],
  declarations: [DataTableComponent, DataTableFilterComponent],
  exports: [DataTableComponent, DataTableFilterComponent]
})
export class DataTableModule {}

