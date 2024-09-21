import './auth.scss'

export default function AuthLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <div className='col-lg-7 col-xl-8 bg-gradient p-0'>
          <div className='p-0 h-100'>
            {/* <Link href='/dashboards/dashboard1'>
              <Image src='/images/logo.png' alt='logo' width={150} height={50} className='m-2' />
            </Link> */}
            <div className='d-none d-lg-flex align-items-center justify-content-center h-100'>
              <img
                src='/images/auth/auth-bg.jpg'
                alt='login'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className='img-fluid'
              />
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-xl-4 p-0'>
          <div className='p-4 d-flex align-items-center justify-content-center h-100'>{children}</div>
        </div>
      </div>
    </div>
  )
}
