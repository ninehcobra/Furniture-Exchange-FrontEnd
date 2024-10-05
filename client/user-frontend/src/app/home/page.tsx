'use client'
import Header from '@/common/components/Header'
import './home.scss'
import Footer from '@/common/components/Footer'
import HomeBanner from './components/HomeBanner'
import CategoryBanner from './components/category-banner'
import ProductList from './components/ProductList'
import { useGetProductsQuery } from '@/services/product.service'
export default function Home(): React.ReactNode {
  const { data } = useGetProductsQuery()

  return (
    <div className='home-page'>
      <Header />
      <div className='content-wrapper'>
        <HomeBanner />
        <CategoryBanner />
        <div className='w-100 mt-3 p-0 container'>
          <img className='w-100' src='./images/banner/banner-full-size.png' alt='banner' />
        </div>
        <div className='my-3 text-center container suggest-section p-3 body-l'>Gợi ý hôm nay</div>
        {data ? <ProductList products={data} /> : ''}
      </div>
      <Footer />
    </div>
  )
}
