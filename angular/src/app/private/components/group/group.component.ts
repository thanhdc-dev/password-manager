import { Inject, Injector } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '@private/services/group.service';
import { ModalAddGroupComponent } from './modals/modal-add-group/modal-add-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [
    GroupService
  ]
})
export class GroupComponent extends BaseComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    @Inject(Injector) injector: Injector,
  ) {
    super(injector);
    this.setService(groupService);
  }

  ngOnInit(): void {
    this.actionFn['actionEdit'] = this.actionEdit.bind(this);

    this.setColumns([
      {
        title: 'STT',
        name: 'index',
      },
      {
        title: 'Name',
        name: 'name',
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
    this.dialog.open(ModalAddGroupComponent, {
      data: { action: 'add' },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  actionEdit(rowUuid: string) {
    this.dialog.open(ModalAddGroupComponent, {
      data: { action: 'edit', id: rowUuid },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
}
