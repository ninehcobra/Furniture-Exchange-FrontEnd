import { IProduct } from './product.model';

export interface ICategory {
  id: number;
  parent_id: number | null;
  name: string;
  description: string;
  image_url: string;
  image_id: string;
  order: number;
  parent: ICategory | null;
  slug: string;
}

export interface IGetProductByCategorySlugResponse extends ICategory {
  products: IProduct[];
}
