import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ModalConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class ModalConfirmModule { }
