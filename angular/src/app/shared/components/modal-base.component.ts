
import { Directive, Injector } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Directive()
export class ModalBaseComponent {
  data: any = {};
  dialogRef: MatDialogRef<ModalBaseComponent>;

  constructor(injector: Injector) {
    this.data = injector.get(MAT_DIALOG_DATA);
    this.dialogRef = injector.get(MatDialogRef, ModalBaseComponent);
  }

  close(data: any = false) {
    this.dialogRef.close(data);
  }
}
