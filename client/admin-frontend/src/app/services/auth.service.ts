import { Injectable } from '@angular/core';

import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
} from '../models/auth.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  url = 'auth';

  login(data: ILoginPayload): Observable<ILoginResponse> {
    return this.post<ILoginResponse>(
      `${this.dynamicURL}/${this.url}/login`,
      data
    );
  }

  register(data: IRegisterPayload): Observable<IRegisterResponse> {
    return this.post<IRegisterResponse>(
      `${this.dynamicURL}/${this.url}/register`,
      data
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
