import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService {
  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.setEndPoint(`/groups`);
  }
}
