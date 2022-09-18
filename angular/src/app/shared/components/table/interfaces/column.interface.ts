export interface ColumnInterface {
  title: string;
  name: string;
  cell?(row: any): any
}
