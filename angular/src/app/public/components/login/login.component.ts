import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [
    AuthService
  ]
})
export class LoginComponent extends BaseComponent implements OnInit {

  isInvalidEmailOrPassword = false;
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    remember_me: false
  });
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) {
    super();
    const state: any = this._router.getCurrentNavigation()?.extras?.state ?? null;
    if (typeof state?.form_data != 'undefined') {
        this.form.patchValue(state.form_data);
    }
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.setLoading(true);
    if (this.isInvalidEmailOrPassword) {
      this.isInvalidEmailOrPassword = false;
    }
    this._authService.login(this.form.value.email, this.form.value.password).subscribe(isSuccess => {
      this.setLoading(false);
      if (isSuccess) {
        console.log('Logged in');
      } else {
        this.isInvalidEmailOrPassword = true;
      }
    });
  }
}
