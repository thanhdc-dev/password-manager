export interface ActionInterface {
  title: string;
  name: string;
  icon: string;
  isShow?: boolean;
  color?: string;
  class?: string;
  is_bulk?: boolean;
  isShowFn?(row: any): boolean;
}
