import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LocalStorageUtil } from '../utils/local-storage.util';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isAuthPage = route.routeConfig?.path?.includes('authentication');
    const accessToken = LocalStorageUtil.get('access_token');

    if (isAuthPage && accessToken) {
      console.log('Đã đăng nhập');
      this.router.navigate(['/dashboards/dashboard1']);
    }

    if (isAuthPage) {
      return of(true);
    }

    if (!accessToken) {
      this.router.navigate(['/authentication/side-login']);
      return of(false);
    }

    return this.userService.getUserInfo().pipe(
      map((res) => {
        this.userService.setUser(res);
        return this.checkRoleAccess(route.data['roles'], res.role);
      }),
      catchError((error) => {
        this.handleAuthError();
        return of(false);
      })
    );
  }

  private checkRoleAccess(requiredRoles: string[], userRole: string): boolean {
    if (!requiredRoles || requiredRoles.includes(userRole)) {
      return true;
    } else {
      LocalStorageUtil.clear();
      this.router.navigate(['/unauthorized']);
      this.toastService.showError('Bạn không có quyền truy cập');
      return false;
    }
  }

  private handleAuthError(): void {
    LocalStorageUtil.clear();
    this.router.navigate(['/authentication/side-login']);
    this.toastService.showError('Authentication failed');
  }
}
