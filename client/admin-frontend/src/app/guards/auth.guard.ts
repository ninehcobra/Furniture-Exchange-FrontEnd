import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtil } from '../utils/local-storage.util';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  canActivate(): boolean {
    if (LocalStorageUtil.get('access_token')) {
      this.userService.getUserInfo().subscribe(
        (res) => {
          this.userService.setUser(res);
          return true;
        },
        (error) => {
          LocalStorageUtil.remove('access_token');
          LocalStorageUtil.remove('refresh_token');
          LocalStorageUtil.remove('user');
          this.router.navigate(['/authentication/side-login']);
          this.toastService.showError(error);
          return false;
        }
      );
      return true;
    } else {
      this.router.navigate(['/authentication/side-login']);
      return false;
    }
  }
}
