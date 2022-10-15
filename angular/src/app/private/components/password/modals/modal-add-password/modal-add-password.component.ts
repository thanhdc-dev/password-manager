import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { UserPasswordService } from '@private/services/user-password.service';
import { empty, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { GroupService } from '@private/services/group.service';

@Component({
  selector: 'app-modal-add-password',
  templateUrl: './modal-add-password.component.html',
  styleUrls: ['./modal-add-password.component.scss'],
  providers: [
    UserPasswordService,
    GroupService,
  ]
})
export class ModalAddPasswordComponent implements OnInit {
  action: string = 'add';
  title: string = 'Password';
  id: string = '';
  form: FormGroup = this.fb.group({
    url: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    note: null,
    group_id: 0,
  });

  groupCtrl = new FormControl();
  filteredGroups!: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ModalAddPasswordComponent>,
    private fb: FormBuilder,
    private userPasswordService: UserPasswordService,
    private groupService: GroupService,
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
    this.initGroupFilter();
  }

  getDetail() {
    this.userPasswordService.show(this.id).subscribe(res => {
      const password = res?.data;
      this.form.patchValue(password)
      if (password?.group) {
        this.groupCtrl.patchValue(password.group);
      }
    });
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

  displayFn(option: any): string {
    return option?.name ?? '';
  }

  initGroupFilter() {
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => this.filterGroups(val || ''))
    )
  }

  filterGroups(keyword: any) {
    if (keyword.id) {
      return empty();
    }
    return Observable.create(async (observer: { next: (arg0: any) => void; }) => {
      this.groupService.index().subscribe(res => {
        observer.next(res?.data ?? []);
      });
    });
  }

  selectGroup() {
    console.log(this.groupCtrl.value)
    this.form.patchValue({group_id: this.groupCtrl.value.id});
    this.initGroupFilter();
  }
}
