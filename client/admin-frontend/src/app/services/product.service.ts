import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ICreateProductPayload, IProduct } from '../models/product.model';
import { IGetProductByCategorySlugResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  url = 'products';

  createProduct(payload: ICreateProductPayload): Observable<any> {
    return this.post(this.url, payload);
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.get(this.url);
  }

  getProductBySlug(slug: string): Observable<IProduct> {
    return this.get(`${this.url}/${slug}`);
  }

  getSellerProducts(): Observable<IProduct[]> {
    return this.get(`${this.url}/seller`);
  }
}
