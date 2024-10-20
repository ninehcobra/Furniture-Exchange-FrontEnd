import { Injectable } from '@angular/core';

import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
} from '../models/auth.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  url = 'categories';

  getAllCategories(): Observable<ICategory[]> {
    return this.get(this.url);
  }
}
