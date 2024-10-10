import { Component, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { IRegisterPayload, IRegisterResponse } from 'src/app/models/auth.model';
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { IErrorResponse } from 'src/app/models/error.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-register.component.html',
  styleUrls: ['../authentication.component.scss'],
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const registerPayload: IRegisterPayload = {
        username: this.form.value.username || '',
        email: this.form.value.email || '',
        password: this.form.value.password || '',
        firstName: this.form.value.firstName || '',
        lastName: this.form.value.lastName || '',
      };
      this.authService.register(registerPayload).subscribe(
        (response: IRegisterResponse) => {
          LocalStorageUtil.remove('access_token');
          LocalStorageUtil.remove('refresh_token');
          LocalStorageUtil.set('access_token', response.accessToken);
          LocalStorageUtil.set('refresh_token', response.refreshToken);
          this.toastService.showSuccess('Register success');
          this.router.navigate(['/starter']);
        },
        (error) => {
          const errorResponse = error.error as IErrorResponse;
          this.toastService.showError(errorResponse.message);
        }
      );
    }

    // this.router.navigate(['/dashboards/dashboard1']);
  }
}
