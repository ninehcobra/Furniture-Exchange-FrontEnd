import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { IGetUserInfoResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  url = 'users';

  getUserInfo() {
    return this.get<IGetUserInfoResponse>(`${this.url}/profile`);
  }
}
