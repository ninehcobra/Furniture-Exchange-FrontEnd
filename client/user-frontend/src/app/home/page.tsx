import Header from '@/common/components/Header'
import './home.scss'
import Footer from '@/common/components/Footer'
import HomeBanner from './components/HomeBanner'

export default function Home(): React.ReactNode {
  return (
    <div className='home-page'>
      <Header />
      <div className='content-wrapper'>
        <HomeBanner />
      </div>
      <Footer />
    </div>
  )
}
