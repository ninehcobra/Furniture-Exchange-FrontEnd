import Footer from '@/common/components/Footer'
import Header from '@/common/components/Header'

export default function ProductLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
