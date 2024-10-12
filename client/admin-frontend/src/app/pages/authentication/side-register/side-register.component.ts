import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { IRegisterPayload } from 'src/app/models/auth.model';
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
        email: this.form.value.email || '',
        password: this.form.value.password || '',
        firstName: this.form.value.firstName || '',
        lastName: this.form.value.lastName || '',
        sex: 'male',
        phoneNumber: '',
      };
      this.authService
        .register(registerPayload)
        .subscribe((response: boolean) => {
          if (response) {
            this.toastService.showSuccess(
              'Register success! Please check your email to verify your account.'
            );
            this.router.navigate(['/authentication/email-confirm'], {
              state: { email: this.form.value.email },
            });
          }
        });
    }

    // this.router.navigate(['/dashboards/dashboard1']);
  }
}
