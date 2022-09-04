import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AuthService
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    remember_me: false
  });
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this._authService.login(this.form.value.email, this.form.value.password).subscribe(isSuccess => {
      if (isSuccess) {
        console.log('Logged in');
      } else {
        console.log('Logout');
      }
    });
  }
}
