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
  id: number = 0;
  form: FormGroup = this.fb.group({
    user_id: [this.authService.getUserLogin()?.id, Validators.required],
    url: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    note: null,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ModalAddPasswordComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private userPasswordService: UserPasswordService,
  ) {
  }

  ngOnInit(): void {
    if (this.data?.action) {
      this.action = this.data.action;
    }
    if (this.data?.id) {
      this.id = this.data.id;
      this.getDetail();
    }
  }

  getDetail() {
    this.userPasswordService.show(this.id).subscribe(res => this.form.patchValue(res?.data));
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
        this.userPasswordService.update(this.id, params).subscribe(res => {
          if (res.status) {
            this.close(true);
          }
        });
      }
    }
  }
}
