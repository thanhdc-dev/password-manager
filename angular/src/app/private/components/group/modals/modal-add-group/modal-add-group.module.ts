import { ModalAddGroupComponent } from './modal-add-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmModule } from '@shared/components/modal-confirm/modal-confirm.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ModalAddGroupComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalConfirmModule,
    MatAutocompleteModule,
  ]
})
export class ModalAddGroupModule { }
