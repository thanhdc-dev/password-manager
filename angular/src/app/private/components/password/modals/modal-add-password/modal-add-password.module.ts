import { ModalAddPasswordComponent } from './modal-add-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmModule } from '@shared/components/modal-confirm/modal-confirm.module';


@NgModule({
  declarations: [
    ModalAddPasswordComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalConfirmModule,
  ]
})
export class ModalAddPasswordModule { }
