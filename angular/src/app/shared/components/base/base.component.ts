import { Directive, Injector, OnInit } from "@angular/core";
import { ColumnInterface } from "../table/interfaces/column.interface";
import { ActionInterface } from '../table/interfaces/action.interface';
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
  private _pageSize: number = 5;
  private _pageSizeOptions: number[] = [5, 10, 20, 100, 500];
  public actionFn: any = {};
  dialog: MatDialog;
  service: BaseService;
  constructor(injector: Injector) {
    this.dialog = injector.get(MatDialog);
    this.service = injector.get(BaseService);
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

  generateData(res: any) {
    this.setTotal(res?.total ?? 0);
    this.setDataSource(res?.data ?? []);
  }

  onActionClicked(event: { name: string, id: number }) {
    this.callFn(event.name, event.id);
  }

  callFn(actionName: string, id: number) {
    if (typeof this.actionFn[actionName] == 'function') {
      this.actionFn[actionName](id);
    }
  }

  setService(_service: BaseService) {
    this.service = _service;
  }

  /**
   * Xóa 1 dòng dữ liệu
   */
  actionDelete(rowId: number) {
    this.dialog.open(ModalConfirmComponent, {
      width: '400px',
      data: {
        title: 'Confirm',
        message: 'Delete account ?'
      }
    }).afterClosed().subscribe(isOk => {
      if (isOk) {
        this.setLoading(true);
        this.service.delete([rowId]).subscribe(res => {
          this.setLoading(false);
          console.log(res?.status ? 'delete success' : 'delete fail');
        });
      }
    })
  }
}
