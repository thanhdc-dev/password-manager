import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends BaseComponent implements OnInit {

  form: FormGroup = this._fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6), this.passwordMatchValidator()]],
    re_password: [null, [Validators.required, Validators.minLength(6), this.rePasswordMatchValidator()]],
  });

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const form = control.parent;
      const rePassword = form?.get('re_password')?.value;
      return (form?.get('re_password')?.touched && rePassword != password) ? {password_match: true} : null;
    };
  }

  private rePasswordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rePassword = control.value;
      const form = control.parent;
      const password = form?.get('password')?.value;
      return (rePassword != password) ? {password_match: true} : null;
    };
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.setLoading(true);
    this._authService.register(this.form.value).subscribe(isSuccess => {
      this.setLoading(false);
      if (isSuccess) {
        this._doRegistered();
      }
    });
  }

  private _doRegistered() {
    const formValue = this.form.value;
    const formData = {email: formValue?.email, password: formValue?.password};
    this._router.navigateByUrl('/login', {state:  {form_data: formData}});
  }

}
