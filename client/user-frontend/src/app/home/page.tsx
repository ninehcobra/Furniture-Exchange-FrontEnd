'use client'
import Header from '@/common/components/Header'
import './home.scss'
import Footer from '@/common/components/Footer'
import HomeBanner from './components/HomeBanner'
import CategoryBanner from './components/category-banner'
import ProductList from './components/ProductList'
import { useGetProductsQuery } from '@/services/product.service'
import { Spin } from 'antd'
export default function Home(): React.ReactNode {
  const { data, isLoading } = useGetProductsQuery()

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

        {isLoading ? (
          <div className=' loading-wrapper d-flex align-items-center justify-content-center'>
            <Spin tip='Loading...'></Spin>
          </div>
        ) : data ? (
          <ProductList products={data} />
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  )
}
