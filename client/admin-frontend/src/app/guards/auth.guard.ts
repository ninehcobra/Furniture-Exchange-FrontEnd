import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtil } from '../utils/local-storage.util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (LocalStorageUtil.get('access_token')) {
      return true;
    } else {
      this.router.navigate(['/authentication/side-login']);
      return false;
    }
  }
}
