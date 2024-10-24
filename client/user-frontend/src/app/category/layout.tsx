import Footer from '@/common/components/Footer'
import Header from '@/common/components/Header'
import { ReactNode } from 'react'
import HomeBanner from '../home/components/HomeBanner'
import CategoryBanner from '../home/components/category-banner'

export default function CategoryLayout({ children }: { children: React.ReactNode }): ReactNode {
  return (
    <div>
      <Header />
      <div className='content-wrapper'>
        <CategoryBanner />
        {children}
      </div>
      <Footer />
    </div>
  )
}
