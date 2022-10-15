import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { ActionInterface } from './interfaces/action.interface';
import { ColumnInterface } from './interfaces/column.interface';
import { RowInterface } from './interfaces/row.interface';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnChanges, AfterViewInit {
  @Input() idKeyName: string = 'id';
  @Input() isLoading: boolean = false;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 100, 500];
  @Input() total: number = 0;
  @Input() columns: ColumnInterface[] = [];
  @Input() actions: ActionInterface[] = [];
  @Input() dataSource: RowInterface[] = [];
  @Input() rowsChecked: RowInterface[] = [];
  displayedColumns: string[] = [];
  displayedActions: ActionInterface[] = [];
  selection = new SelectionModel<RowInterface>(true, []);
  keyword: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('checkBoxToggleAllRows') checkBoxToggleAllRows!: MatCheckbox;

  @Output() pageChange = new EventEmitter<{pageIndex: number, pageSize: number}>();
  @Output() actionClicked = new EventEmitter<{name: string, id: string}>();
  @Output() bulkActionClicked = new EventEmitter<{name: string, rows: RowInterface[]}>();
  @Output() rowsCheckedChange = new EventEmitter<RowInterface[]>();
  @Output() keywordChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.columns && Array.isArray(changes.columns.currentValue)) {
      this.displayedColumns = changes.columns.currentValue.map((column: ColumnInterface) => column.name);
      this.displayedColumns.unshift('select');
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
    if (changes?.rowsChecked && Array.isArray(changes.rowsChecked.currentValue)) {
      this.selection.clear();
      const rowsChecked = changes.rowsChecked.currentValue;
      this.selection.select(...rowsChecked);
      if (this.checkBoxToggleAllRows) {
        const dataSource = changes?.rowsChecked?.currentValue ?? this.dataSource;
        this.checkBoxToggleAllRows.checked = !!(dataSource.length && (rowsChecked.length == dataSource.length));
        this.checkBoxToggleAllRows.indeterminate = !!(dataSource.length && rowsChecked.length && (rowsChecked.length != dataSource.length));
      }
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

  onActionClicked(actionName: string, rowUuid: string) {
    console.log(`Action ${actionName} clicked`);
    this.actionClicked.emit({name: actionName, id: rowUuid});
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
    this.emitRowChecked();
  }

  /**
   * Event row checked
   * @param row
   */
  onRowChecked(row: RowInterface) {
    this.selection.toggle(row);
    this.emitRowChecked();
  }

  /**
   * Check hide/show action
   */
  isShowActionHeader(action: ActionInterface) {
    return action?.is_bulk && (typeof action.isShow == 'undefined' || action.isShow);
  }

  /**
   * Event action multiple clicked
   */
  onActionMultipleClicked(action: ActionInterface) {
    this.bulkActionClicked.emit({name: action.name, rows: this.selection.selected});
  }

  /**
   * Event search data
   */
  onKeywordChange() {
    this.keywordChange.emit(this.keyword);
  }

  /**
   * Reset input search
   */
  resetKeyword() {
    this.keyword = '';
    this.onKeywordChange();
  }

  private emitRowChecked() {
    this.rowsCheckedChange.emit(this.selection.selected);
  }
}
