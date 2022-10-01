import { Inject, Injector } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { UserPasswordService } from '@private/services/user-password.service';
import { ModalAddPasswordComponent } from './modals/modal-add-password/modal-add-password.component';
import { BaseService } from '@shared/services/base.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    UserPasswordService
  ]
})
export class PasswordComponent extends BaseComponent implements OnInit {

  constructor(
    private passwordService: UserPasswordService,
    @Inject(Injector) injector: Injector,
  ) {
    super(injector);
    this.setService(passwordService);
  }

  ngOnInit(): void {
    this.actionFn['actionEdit'] = this.actionEdit.bind(this);

    this.setColumns([
      {
        title: 'STT',
        name: 'index',
      },
      {
        title: 'URL',
        name: 'url',
        cellFn: ({ url }) => {
          const fullUrl = new URL(url);
          return fullUrl.origin;
        }
      },
      {
        title: 'Note',
        name: 'note',
      }
    ]);
    this.setActions([
      {
        title: 'Edit',
        name: 'actionEdit',
        icon: 'edit',
        class: 'has-text-info'
      },
      {
        title: 'Delete',
        name: 'actionDelete',
        icon: 'delete',
        class: 'has-text-danger',
        is_bulk: true,
      }
    ])
    this.getData();
  }

  add(): void {
    this.dialog.open(ModalAddPasswordComponent, {
      data: { action: 'add' },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  actionEdit(rowUuid: string) {
    this.dialog.open(ModalAddPasswordComponent, {
      data: { action: 'edit', uuid: rowUuid },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
}
