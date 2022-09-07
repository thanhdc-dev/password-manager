import { Injectable } from "@angular/core";

@Injectable()
export class BaseComponent {
  private _is_loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  setLoading(isLoading: boolean) {
    this._is_loading = isLoading;
  }

  get is_loading(): boolean {
    return this._is_loading;
  }
}
