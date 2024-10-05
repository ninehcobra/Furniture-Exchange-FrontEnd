/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/types/product'
import './product-card.scss'
import moment from 'moment'
import 'moment/locale/vi'

export default function ProductCard({ product }: { product: IProduct }): React.ReactNode {
  const truncateName = (name: string, maxLength: number): string => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  const formatTime = (createdAt: string): string => {
    moment.locale('vi')
    return moment(createdAt).fromNow() ?? ''
  }
  return (
    <div className='card card-product'>
      <img src={product.image_urls[0]} className='card-img-top' alt={product.name} />
      <div className='card-body d-flex flex-column p-2'>
        <div className='card-title body-s m-0'>{truncateName(product.name, 20)}</div>
        <div className='card-text body-xs category-text'>{product.category_name || 'Unknown Category'}</div>
        <div className='card-text price-text body-s'>{formatPrice(product.price)}</div>
        <div className='card-text time-district-text body-xs mt-auto'>
          <i className='fa-solid fa-couch me-1'></i>
          {formatTime(product.created_at)} • {product.district}
        </div>
      </div>
      <button className='btn btn-link position-absolute top-0 end-0 p-2' onClick={() => console.log('Add to wishlist')}>
        <i className='fa-regular fa-heart'></i>
      </button>
    </div>
  )
}
