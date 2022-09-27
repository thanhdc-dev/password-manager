import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { UserPasswordService } from '@private/services/user-password.service';

@Component({
  selector: 'app-modal-add-password',
  templateUrl: './modal-add-password.component.html',
  styleUrls: ['./modal-add-password.component.scss'],
  providers: [
    UserPasswordService,
  ]
})
export class ModalAddPasswordComponent implements OnInit {
  action: string = 'add';
  title: string = 'Password';
  uuid: string = '';
  form: FormGroup = this.fb.group({
    url: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    note: null,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ModalAddPasswordComponent>,
    private fb: FormBuilder,
    private userPasswordService: UserPasswordService,
  ) {
  }

  ngOnInit(): void {
    if (this.data?.action) {
      this.action = this.data.action;
    }
    if (this.data?.uuid) {
      this.uuid = this.data.uuid;
      this.getDetail();
    }
  }

  getDetail() {
    this.userPasswordService.show(this.uuid).subscribe(res => this.form.patchValue(res?.data));
  }

  close(data: any = false) {
    this.dialogRef.close(data);
  }

  submit() {
    if (this.form.valid) {
      const params = this.form.value;
      if (this.action == 'add') {
        this.userPasswordService.store(params).subscribe(res => {
          if (res.status) {
            this.close(true);
          }
        });
      } else {
        this.userPasswordService.update(this.uuid, params).subscribe(res => {
          if (res.status) {
            this.close(true);
          }
        });
      }
    }
  }
}
