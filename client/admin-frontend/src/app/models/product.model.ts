export interface IProduct {
  created_at: string;
  deleted_at: null;
  id: number;
  seller_id: string;
  category_id: number;
  name: string;
  quantity: number;
  description: string;
  image_urls: string[];
  image_ids: string[];
  price: number;
  origin: string;
  address_line: string;
  district: string;
  province: string;
  status: string;
  state: string;
  updated_at: string;
  expired_at: string;
  category_name?: string;
  slug: string;
  kilogram: string;
}

export interface ICreateProductPayload {
  name: string;
  description: string;
  image_urls?: string[];
  image_files?: File[];
  price: number;
  quantity: number;
  origin: string;
  address_line: string;
  district: string;
  province: string;
  state: 'used' | 'new';
  category_id: number;
  expired_at: string;
  kilogram: string;
}
