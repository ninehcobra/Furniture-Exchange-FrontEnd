import Header from '@/common/components/Header'
import './home.scss'
import Footer from '@/common/components/Footer'

export default function Home(): React.ReactNode {
  return (
    <div>
      <Header />
      <div className='content-wrapper'></div>
      <Footer />
    </div>
  )
}
