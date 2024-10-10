// src/app/services/banner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private bannerSubject = new BehaviorSubject<any>(null);
  banner$ = this.bannerSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.bannerSubject.next({ message, type });
  }

  hide() {
    this.bannerSubject.next(null);
  }
}
