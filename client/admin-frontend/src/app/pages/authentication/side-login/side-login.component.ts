import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { RouterModule, Router } from '@angular/router';

import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { IErrorResponse } from 'src/app/models/error.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-login.component.html',
  providers: [AuthService, ToastService],
  styleUrls: ['../authentication.component.scss'],
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  constructor(
    private settings: CoreService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}
  //
  form = new FormGroup({
    usernameOrEmail: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const usernameOrEmail = this.form.value.usernameOrEmail ?? '';
      const password = this.form.value.password ?? '';
      this.authService
        .login({
          email: usernameOrEmail,
          password: password,
        })
        .subscribe((response) => {
          LocalStorageUtil.remove('access_token');
          LocalStorageUtil.remove('refresh_token');
          LocalStorageUtil.set('access_token', response.accessToken);
          LocalStorageUtil.set('refresh_token', response.refreshToken);

          this.userService.getUserInfo().subscribe((response) => {
            this.userService.setUser(response);
            this.toastService.showSuccess('Login success');
            this.ngZone.run(() => {
              this.router.navigate(['/dashboards/dashboard1']).then(() => {
                this.cdr.detectChanges();
              });
            });
          });
        });
    }
  }
}
