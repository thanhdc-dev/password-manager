import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
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
  @Input() dataSource: any[] = [];
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() pageChange = new EventEmitter<{pageIndex: number, pageSize: number}>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.columns && Array.isArray(changes.columns.currentValue)) {
      this.displayedColumns = changes.columns.currentValue.map((column: ColumnInterface) => column.name);
    }
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.pageChange.emit({pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize}))
        )
        .subscribe();
}

  hasCell(row: any): boolean {
    return typeof row.cell == 'function';
  }

  onRowClicked(row: ColumnInterface) {
    console.log('Row clicked: ', row);
  }

  onCellClicked(row: ColumnInterface, columnName: string) {
    console.log('Cell clicked: ', row, columnName);
  }

}
