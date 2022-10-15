import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { TableModule } from '@shared/components/table/table.module';
import { ModalAddGroupModule } from './modals/modal-add-group/modal-add-group.module';


@NgModule({
  declarations: [
    GroupComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    TableModule,
    ModalAddGroupModule,
  ]
})
export class GroupModule { }
