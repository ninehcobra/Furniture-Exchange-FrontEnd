import React from 'react'
import ProductCard from '../../../common/components/ProductCard'
import './product-list.scss'
import { IProduct } from '@/types/product'

export default function ProductList({ products }: { products: IProduct[] }): React.ReactNode {
  // Assuming you have a list of products, you can map through them

  return (
    <div className='container p-0 mb-3'>
      <div className='row g-2'>
        {products.map((product) => (
          <div key={product.id} className='col-md-2 mb-1'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
