import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppSideForgotPasswordComponent } from './side-forgot-password/side-forgot-password.component';
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppSideTwoStepsComponent } from './side-two-steps/side-two-steps.component';
import { AppEmailConfirmComponent } from './email-confirm/email-confirm.component';
import { AppConfirmVerifyEmail } from './verify-email/confirm/confirm-verify-email.component';
import { AppVerifyEmail } from './verify-email/verify-email.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent,
      },
      {
        path: 'maintenance',
        component: AppMaintenanceComponent,
      },
      {
        path: 'side-forgot-pwd',
        component: AppSideForgotPasswordComponent,
      },
      {
        path: 'side-login',
        component: AppSideLoginComponent,
      },
      {
        path: 'side-register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'side-two-steps',
        component: AppSideTwoStepsComponent,
      },
      {
        path: 'email-confirm',
        component: AppEmailConfirmComponent,
      },
      {
        path: 'verify-email',
        component: AppVerifyEmail,
      },
      {
        path: 'verify-email/confirm',
        component: AppConfirmVerifyEmail,
      },
    ],
  },
];
