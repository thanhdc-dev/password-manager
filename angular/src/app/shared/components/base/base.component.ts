import { Injectable, OnInit } from "@angular/core";
import { ColumnInterface } from "../table/interfaces/column.interface";

@Injectable()
export class BaseComponent implements OnInit {
  private _is_loading = false;
  private _columns: ColumnInterface[] = [];
  private _dataSource: any = [];
  private _pageIndex: number = 0;
  private _total: number = 0;
  private _pageSize: number = 5;
  private _pageSizeOptions: number[] = [5, 10, 20, 100, 500];
  constructor() { }

  ngOnInit(): void {

  }

  setLoading(isLoading: boolean) {
    this._is_loading = isLoading;
  }

  get is_loading(): boolean {
    return this._is_loading;
  }

  setColumns(columns: ColumnInterface[]) {
    this._columns = columns;
  }

  get dataSource(): any[] {
    return this._dataSource;
  }

  setDataSource(dataSource: any[]) {
    this._dataSource = dataSource;
  }

  get columns(): ColumnInterface[] {
    return this._columns;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  setPageIndex(pageIndex: number) {
    this._pageIndex = pageIndex;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  setPageSize(pageSize: number) {
    this._pageSize = pageSize;
  }

  get total(): number {
    return this._total;
  }

  setTotal(total: number) {
    this._total = total;
  }

  get pageSizeOptions(): number[]{
    return this._pageSizeOptions;
  }

  setPageSizeOptions(pageSizeOptions: number[]) {
    this._pageSizeOptions = pageSizeOptions;
  }

  generateData(res: any) {
    this.setTotal(res?.total ?? 0);
    this.setDataSource(res?.data ?? []);
  }
}
