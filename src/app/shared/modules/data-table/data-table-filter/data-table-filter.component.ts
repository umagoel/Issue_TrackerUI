import { DataTableFilter } from './data-table-filter.interface';

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { TableColumn, TableColumnProp } from '@swimlane/ngx-datatable';
import { chain, Dictionary, forEach, forOwn, get, includes, intersection, remove } from 'lodash';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DefaultCheck {
  prop: string;
  value: string | Array<string>;
}

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.scss']
})
export class DataTableFilterComponent implements OnInit, OnChanges {
  @Input()
  public row: Array<Dictionary<{}>>;
  @Input()
  public columns: Array<TableColumn>;
  @Input()
  public filterIndex: Array<number>;
  @Input()
  public defaultCheck: Array<DefaultCheck>;
  @Output()
  public readonly onFilter: EventEmitter<DataTableFilter> = new EventEmitter<DataTableFilter>();

  @ViewChildren('filterCheckbox')
  public filterCheckboxes: QueryList<ElementRef>;

  public selectedFilter: Dictionary<Array<string>>;
  public filteredRow: Array<Dictionary<{}>>;
  public filterableColumns: Array<TableColumn>;
  public filterMap: Array<{
      name: string;
      prop: TableColumnProp;
      values: Array<number | string | {}>;
      visibleItem: number;
  }>;

  constructor(private _changeDetector: ChangeDetectorRef) {
      this.filterIndex = [];
      this.filterMap = [];
      this.selectedFilter = {};
      this.defaultCheck = [];
  }

  private get _filterApplied(): boolean {
      return this.filterCheckboxes.filter(input => input.nativeElement.checked).length > 0;
  }

  public ngOnChanges(change: SimpleChanges): void {
      if (change.row && !change.row.isFirstChange() && this.filterIndex.length) {
          this.updateFilterableColumn();
          this._prepareFilter();
          this._filterRow();
      }

      if (change.row && !change.row.isFirstChange() && get(this.defaultCheck, 'length', 0)) {
          this._updateDefaultCheck();
      }
  }

  public ngOnInit(): void {
      this.updateFilterableColumn();
  }

  public updateFilterableColumn(): void {
      this.filterableColumns = this.filterIndex.length
          ? this.filterIndex.map(i => this.columns[i])
          : [...this.columns];
  }

  public clearAll(): void {
      this.selectedFilter = {};
      this.filteredRow = this.row;
      if (this.filterCheckboxes.length) {
          this.filterCheckboxes.forEach(input => (input.nativeElement.checked = false));
      }
      this._emitFilterStatus();
  }

  public onFilterSelection(prop: TableColumnProp, value: string | number, checked: boolean): void {
      if (checked) {
          if (this.selectedFilter[prop]) {
              this.selectedFilter[prop].push(<string>value);
          } else {
              this.selectedFilter[prop] = [<string>value];
          }
      } else {
          remove(this.selectedFilter[prop], i => i === value);
          if (!this.selectedFilter[prop].length) {
              delete this.selectedFilter[prop];
          }
      }
      this._filterRow();
  }

  private _updateDefaultCheck(): void {
      const updateFilterAndDom = (prop, value) => {
          this.onFilterSelection(prop, value, true);
          const element = this.filterCheckboxes.find(input => input.nativeElement.id === `${prop}${value}`);
          if (element) {
              element.nativeElement.checked = true;
          }
      };
      from(this.defaultCheck || [])
          .pipe(delay(100))
          .subscribe(
              filter => {
                  typeof filter.value === 'string'
                      ? updateFilterAndDom(filter.prop, filter.value)
                      : filter.value.forEach(val => updateFilterAndDom(filter.prop, val));
              },
              () => {},
              () => this._emitFilterStatus()
          );
  }

  private _prepareFilter(): void {
      this.filterMap = [];
      forEach(this.filterableColumns.filter(c => !!c).filter(c => c.prop), column => {
          this.filterMap.push({
              name: column.name,
              prop: column.prop,
              values: chain(this.row)
                  .map(r => (column.pipe ? column.pipe.transform(get(r, column.prop)) : get(r, column.prop)))
                  .map(m => {
                      return m && m.split(',').length > 1 ? m.split(',') : m;
                  })
                  .flattenDeep()
                  .uniq()
                  .value(),
              visibleItem: 3
          });
      });
  }

  private _filterRow(): void {
      this.filteredRow = this.row;
      forOwn(this.selectedFilter, (value, key) => {
          const column: TableColumn = this.filterableColumns.find(c => c.prop === key);
          this.filteredRow = this.filteredRow.filter(row => {
              const val = column.pipe ? column.pipe.transform(get(row, key)) : get(row, key);
              return val && val.split(',').length > 1
                  ? intersection(val.split(','), value).length > 0
                  : includes(value, val);
          });
      });

      this._emitFilterStatus();
  }

  private _emitFilterStatus(): void {
      this.onFilter.emit({
          appliedFilter: this._filterApplied,
          filteredRow: this.filteredRow
      });
  }
}
