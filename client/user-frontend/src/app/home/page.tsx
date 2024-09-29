import Header from '@/common/components/Header'
import './home.scss'
import Footer from '@/common/components/Footer'
import HomeBanner from './components/HomeBanner'
import CategoryBanner from './components/category-banner'

export default function Home(): React.ReactNode {
  return (
    <div className='home-page'>
      <Header />
      <div className='content-wrapper'>
        <HomeBanner />
        <CategoryBanner />
        <div className='w-100 mt-3 p-0 container'>
          <img className='w-100' src='./images/banner/banner-full-size.png' alt='banner' />
        </div>
      </div>
      <Footer />
    </div>
  )
}
