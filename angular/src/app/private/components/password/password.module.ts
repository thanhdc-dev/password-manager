import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { TableModule } from '@shared/components/table/table.module';
import { ModalAddPasswordModule } from './modals/modal-add-password/modal-add-password.module';


@NgModule({
  declarations: [
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    TableModule,
    ModalAddPasswordModule,
  ]
})
export class PasswordModule { }
