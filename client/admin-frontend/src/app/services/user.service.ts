import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { IGetUserInfoResponse, IUser } from '../models/user.model';
import { LocalStorageUtil } from '../utils/local-storage.util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();
  url = 'users';

  getUserInfo() {
    return this.get<IGetUserInfoResponse>(`${this.url}/profile`);
  }

  private initUser() {
    const user = LocalStorageUtil.get('user');
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  setUser(user: IUser) {
    LocalStorageUtil.set('user', user);
    this.userSubject.next(user);
  }
}
