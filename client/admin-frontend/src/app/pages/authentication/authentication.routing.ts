import { Routes } from '@angular/router';


import { AppErrorComponent } from './error/error.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppSideForgotPasswordComponent } from './side-forgot-password/side-forgot-password.component';
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppSideTwoStepsComponent } from './side-two-steps/side-two-steps.component';

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
    ],
  },
];
