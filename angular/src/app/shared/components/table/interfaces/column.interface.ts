export interface ColumnInterface {
  readonly title: string;
  readonly name: string;
  cellFn?(row: any): any;
  [propName: string]: any;
}
