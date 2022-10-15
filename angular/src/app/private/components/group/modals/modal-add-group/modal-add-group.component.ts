import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { GroupService } from '@private/services/group.service';
import { ModalBaseComponent } from '@shared/components/modal-base.component';

@Component({
  selector: 'app-modal-add-group',
  templateUrl: './modal-add-group.component.html',
  styleUrls: ['./modal-add-group.component.scss'],
  providers: [
    GroupService,
  ]
})
export class ModalAddGroupComponent extends ModalBaseComponent implements OnInit {
  action: string = 'add';
  title: string = 'Group';
  id: string = '';
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    note: null,
  });

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    @Inject(Injector) injector: Injector,
  ) {
    super(injector);
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
    this.groupService.show(this.id).subscribe(res => {
      this.form.patchValue(res?.data)
    });
  }

  submit() {
    if (this.form.valid) {
      const params = this.form.value;
      if (this.action == 'add') {
        this.groupService.store(params).subscribe(res => {
          if (res.status) {
            this.close(true);
          }
        });
      } else {
        this.groupService.update(this.id, params).subscribe(res => {
          if (res.status) {
            this.close(true);
          }
        });
      }
    }
  }
}
