/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/types/product'
import './product-card.scss'

export default function ProductCard({ product }: { product: IProduct }): React.ReactNode {
  const truncateName = (name: string, maxLength: number): string => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <div className='card card-product'>
      <img src={product.image_urls[0]} className='card-img-top' alt={product.name} />
      <div className='card-body d-flex flex-column'>
        <div className='card-title body-s'>{truncateName(product.name, 20)}</div>
        <p className='card-text mt-auto'>{formatPrice(product.price)}</p>
      </div>
      <button className='btn btn-link position-absolute top-0 end-0 p-2' onClick={() => console.log('Add to wishlist')}>
        <i className='fa-regular fa-heart'></i>
      </button>
    </div>
  )
}
