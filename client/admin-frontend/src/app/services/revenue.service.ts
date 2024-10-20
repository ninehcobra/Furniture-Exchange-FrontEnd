import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IChartRevenue, ITotalRevenue } from '../models/revenue.model';

@Injectable({
  providedIn: 'root',
})
export class RevenueService extends BaseService {
  url = 'revenues';

  getSellerReevenue(): Observable<ITotalRevenue> {
    return this.get(`${this.url}/seller`);
  }

  getSellerChartRevenue(): Observable<IChartRevenue[]> {
    return this.get(`${this.url}/seller/chart`);
  }
}
