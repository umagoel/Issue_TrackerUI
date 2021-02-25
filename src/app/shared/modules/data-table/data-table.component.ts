import { DataTableFilter } from './data-table-filter/data-table-filter.interface';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, TableColumn, TableColumnProp } from '@swimlane/ngx-datatable';
import { camelCase, Dictionary, head } from 'lodash';
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { AppStore } from 'src/app/app.store';
import { untilDestroyed } from '../../utils/take-until-destroy';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    // tslint:disable-next-line:no-any
    public row: Array<any>;
    @Input()
    public searchable: boolean;
    @Input()
    public searchableKeys: Array<string>;
    @Input()
    public columns: Array<TableColumn>;
    @Input()
    public limit: number;
    @Input()
    public defaultSorting: Array<{ prop: string; dir: string }>;
    @Input()
    public filter: boolean;
    @Input()
    public filterIndex: Array<number>;
    @Input()
    public scrollbarH: boolean;
    @Input()
    public columnMode: ColumnMode;
    @Input()
    public defaultCheck: Array<{ prop: string; value: string | Array<string> }>;
    @Input()
    public pagination: boolean;

    @ViewChild('dataTable', { static: true })
    public table: DatatableComponent;

    @ViewChild(DataTableFilterComponent, { static: true })
    public dataTableFilterComponent: DataTableFilterComponent;

    @Output()
    public readonly onFilterIconClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    public sorting: Array<{ prop: string | TableColumnProp; dir: string }>;
    public messages: {};
    public showFilter: boolean;
    public filteredRow: Array<Dictionary<{}>>;
    public searchableString: string;
    public appliedFilter: boolean;

    constructor( private _appStore: AppStore) {
        this.row = [];
        this.columns = [];
        this.limit = 15;
        this.searchable = true;
        this.searchableKeys = [];
        this.sorting = [];

        this.filter = false;
        this.showFilter = false;
        this.filterIndex = [];
        this.filteredRow = [];
        this.scrollbarH = false;
        this.columnMode = ColumnMode.force;
        this.pagination = true;
    }

    public ngOnChanges(): void {
        this.filteredRow = this.row;
        if (this.filterIndex.length) {
            this.filter = true;
        }
        this._renderTable();
    }

    public ngOnInit(): void {
        if (head(this.columns)) {
            this.sorting = this.defaultSorting || [
                {
                    prop: head(this.columns).prop || camelCase(head(this.columns).name),
                    dir: 'asc'
                }
            ];
        }

        this.columns.forEach(c => (c.resizeable = false));
        if (this.filterIndex.length) {
            this.filter = true;
        }

        this._appStore.rerenderComponent
            .pipe(untilDestroyed(this))
            .subscribe(after => setTimeout(() => this._renderTable(), after || 0));
    }

    public setToInitialPage(): void {
        this.table.offset = 0;
    }

    public toggleFilter(): void {
        this.showFilter = !this.showFilter;
        this._appStore.rerenderComponent.next();
        this.onFilterIconClick.emit(this.showFilter);
    }

    public onFilter(event: DataTableFilter): void {
        this.filteredRow = event.filteredRow;
        this.appliedFilter = event.appliedFilter;
        this._renderTable();
    }

    public onSearch(event: string): void {
        this.searchableString = event;
        this.setToInitialPage();
    }

    public ngOnDestroy(): void {}

    private _renderTable(): void {
        this.columns = [...this.columns];
        this.table.recalculate();
        this.setToInitialPage();
    }
}
