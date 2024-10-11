import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './verify-email.component.html',
})
export class AppVerifyEmail implements OnInit {
  options = this.settings.getOptions();

  constructor(
    private router: Router,
    private settings: CoreService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  verifyEmail(): void {
    if (this.form.valid && this.form.value.email) {
      this.authService
        .resendVerifyEmail(this.form.value.email)
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/authentication/email-confirm'], {
              state: { email: this.form.value.email },
            });
            this.toastService.showSuccess('Email sent successfully');
          }
        });
    }
  }

  submit(): void {
    this.verifyEmail();
  }

  onBack(): void {
    this.router.navigate(['/authentication/side-login']);
  }
}
