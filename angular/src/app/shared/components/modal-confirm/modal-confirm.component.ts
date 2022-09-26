import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  title: string = 'Confirm';
  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ModalConfirmComponent>
  ) { }

  ngOnInit(): void {
    if (this.data?.title) {
      this.title = this.data.title;
    }
    if (this.data?.message) {
      this.message = this.data.message;
    }
  }

  close(data: any = false) {
    this.dialogRef.close(data);
  }

  submit() {
    this.close(true);
  }
}
