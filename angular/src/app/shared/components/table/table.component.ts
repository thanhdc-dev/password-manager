import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { ActionInterface } from './interfaces/action.interface';
import { ColumnInterface } from './interfaces/column.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnChanges, AfterViewInit {
  @Input() isLoading: boolean = false;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 100, 500];
  @Input() total: number = 0;
  @Input() columns: ColumnInterface[] = [];
  @Input() actions: ActionInterface[] = [];
  @Input() dataSource: any[] = [];
  displayedColumns: string[] = [];
  displayedActions: ActionInterface[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() pageChange = new EventEmitter<{pageIndex: number, pageSize: number}>();
  @Output() actionClicked = new EventEmitter<{name: string, id: number}>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.columns && Array.isArray(changes.columns.currentValue)) {
      this.displayedColumns = changes.columns.currentValue.map((column: ColumnInterface) => column.name);
      this.displayedColumns.push('action');
    }
    if (changes?.actions && Array.isArray(changes.actions.currentValue)) {
      this.displayedActions = changes.actions.currentValue.filter((action: ActionInterface) => typeof action.isShow == 'undefined' || action.isShow);
    }
    if (changes?.dataSource && Array.isArray(changes.dataSource.currentValue)) {
      this.dataSource = this.dataSource.map(row => {
        row.displayed_cell = {};
        this.columns.forEach((column: ColumnInterface) => {
          row.displayed_cell[column.name] = (typeof column.cellFn == 'function') ? column.cellFn(row) : (row[column.name] ?? '');
        });
        return row;
      });
    }
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.pageChange.emit({pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize}))
        )
        .subscribe();
}

  onRowClicked(row: ColumnInterface) {
    // console.log('Row clicked: ', row);
  }

  onCellClicked(row: ColumnInterface, columnName: string) {
    // console.log('Cell clicked: ', row, columnName);
  }

  onActionClicked(actionName: string, rowId: number) {
    console.log(`Action ${actionName} clicked`);
    this.actionClicked.emit({name: actionName, id: rowId});
  }
}
