export interface ActionInterface {
  title: string;
  name: string;
  icon: string;
  isShow?: boolean;
  isShowFn?(row: any): boolean;
}
