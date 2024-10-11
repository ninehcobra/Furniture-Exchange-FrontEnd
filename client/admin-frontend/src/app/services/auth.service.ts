import { Injectable } from '@angular/core';

import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
} from '../models/auth.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  url = 'auth';

  login(data: ILoginPayload): Observable<ILoginResponse> {
    return this.post<ILoginResponse>(`${this.url}/login`, data);
  }

  register(data: IRegisterPayload): Observable<boolean> {
    return this.post<boolean>(`${this.url}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  verifyEmail(token: string): Observable<boolean> {
    return this.post<boolean>(`${this.url}/verify-email`, {
      token,
    });
  }

  resendVerifyEmail(email: string): Observable<boolean> {
    return this.post<boolean>(`${this.url}/resend-verify-email`, {
      email,
    });
  }
}
