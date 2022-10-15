import { Directive, Injector, OnInit } from "@angular/core";
import { ColumnInterface } from "../table/interfaces/column.interface";
import { ActionInterface } from '../table/interfaces/action.interface';
import { RowInterface } from "../table/interfaces/row.interface";
import { ModalConfirmComponent } from "../modal-confirm/modal-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { BaseService } from "@shared/services/base.service";

@Directive()
export class BaseComponent implements OnInit {
  private _isLoading = false;
  private _columns: ColumnInterface[] = [];
  private _actions: ActionInterface[] = [];
  private _dataSource: any = [];
  private _pageIndex: number = 0;
  private _total: number = 0;
  private _pageSize: number = 10;
  private _pageSizeOptions: number[] = [10, 20, 100, 500];
  public _page_type: string = 'all';
  public rowsChecked: RowInterface[] = [];
  public actionFn: any = {};
  dialog: MatDialog;
  service: BaseService;
  constructor(injector: Injector) {
    this.dialog = injector.get(MatDialog);
    this.service = injector.get(BaseService);
    this.actionFn['actionDelete'] = this.actionDelete.bind(this);
  }

  ngOnInit(): void {

  }

  setLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  get isLoading(): boolean {
    return this._isLoading;
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

  setColumns(columns: ColumnInterface[]) {
    this._columns = columns;
  }

  get actions(): ActionInterface[] {
    return this._actions;
  }

  setActions(actions: ActionInterface[]) {
    this._actions = actions;
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

  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  setPageSizeOptions(pageSizeOptions: number[]) {
    this._pageSizeOptions = pageSizeOptions;
  }

  get pageType(): string {
    return this._page_type;
  }

  setPageType(pageType: string) {
    this._page_type = pageType;
    this.getData();
  }

  generateData(res: any) {
    this.setTotal(res?.total ?? 0);
    this.setDataSource(res?.data ?? []);
  }

  onActionClicked(event: { name: string, id: string }) {
    this.callFn(event.name, event.id);
  }

  onBulkActionClicked(event: {name: string, rows: RowInterface[]}) {
    this.callFn(event.name, '');
  }

  callFn(actionName: string, id: string) {
    if (typeof this.actionFn[actionName] == 'function') {
      this.actionFn[actionName](id);
    }
  }

  setService(_service: BaseService) {
    this.service = _service;
  }

  onPageChange(event: {pageIndex: number, pageSize: number}) {
    this.setPageIndex(event.pageIndex);
    this.setPageSize(event.pageSize);
    this.getData();
  }

  /**
   * Get data from api service
   */
  getData(keyword: string = '') {
    const params: any = {
      per_page: this.pageSize,
      page: this.pageIndex + 1,
      page_type: this.pageType,
    }
    if (keyword) {
      params.keyword = keyword;
    }
    this.setLoading(true);
    this.service.index(params).subscribe(res => {
      this.setLoading(false);
      if (res?.status) {
        this.rowsChecked = [];
        this.generateData(res);
      }
    });
  }

  /**
   * Xóa 1 dòng dữ liệu
   */
  actionDelete(rowId: string) {
    this.dialog.open(ModalConfirmComponent, {
      width: '400px',
      data: {
        title: 'Confirm',
        message: 'Delete account ?'
      }
    }).afterClosed().subscribe(isOk => {
      if (isOk) {
        this.setLoading(true);
        const ids = (rowId) ? [rowId] : this.rowsChecked.map(row => row.id);
        this.service.delete(ids).subscribe(res => {
          this.setLoading(false);
          console.log(res?.status ? 'delete success' : 'delete fail');
          if (res?.status) {
            this.getData();
          }
        });
      }
    })
  }
}
