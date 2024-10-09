import Footer from '@/common/components/Footer'
import Header from '@/common/components/Header'

export default function ProductLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: '#e5e5e5' }} className='pb-2'>
        {children}
      </div>
      <Footer isSecondary={true} />
    </div>
  )
}
