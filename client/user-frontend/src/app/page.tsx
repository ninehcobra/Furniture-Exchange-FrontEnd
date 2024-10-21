'use client'
import { Layout, Image, Menu, MenuProps, Button, Rate } from 'antd'
import { AppstoreOutlined, HomeOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import './_landing-page.scss'
import { useRouter } from 'next/navigation'
const { Header, Content } = Layout

export default function LandingPage(): React.ReactNode {
  type MenuItem = Required<MenuProps>['items'][number]

  const router = useRouter()

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Trang chủ',
      icon: <HomeOutlined />
    },
    {
      key: 'categories',
      label: 'Danh mục',
      icon: <AppstoreOutlined />,
      children: [
        { key: 'electronics', label: 'Đồ điện tử' },
        { key: 'furniture', label: 'Nội thất' },
        { key: 'clothing', label: 'Quần áo' },
        { key: 'books', label: 'Sách' },
        { key: 'other', label: 'Khác' }
      ]
    },
    {
      key: 'sell',
      label: 'Đăng bán',
      icon: <ShoppingOutlined />
    },
    {
      key: 'account',
      label: 'Tài khoản',
      icon: <UserOutlined />
    }
  ]

  const handleRedirect = (key: string): void => {
    router.push(key)
  }
  return (
    <Layout className='landing-page-layout'>
      <Header>
        <div className='container d-flex align-items-center h-100 w-100 justify-content-between'>
          <Image
            className='responsive-logo'
            src='/images/logo.png'
            alt='Bệnh viện Quân Y 7A'
            height={60}
            preview={false}
          />
          <div className='w-75 '>
            <Menu
              className='d-flex justify-content-end border-0'
              theme='light'
              mode='horizontal'
              selectable={false}
              items={items}
            ></Menu>
          </div>
        </div>
      </Header>
      <Content>
        {/* Banner section */}
        <div className='h-100 w-100 banner-section overflow-hidden'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 d-flex align-items-center'>
                <div>
                  <span className='mb-3 d-flex align-items-center banner-welcome'>
                    <ShoppingOutlined className='me-1 welcome-icon' /> Chào mừng đến với
                  </span>
                  <h1 className='banner-title m-0'>
                    Nền tảng mua bán đồ cũ trực tuyến<span className='text-primary'> ESOLD</span>
                  </h1>
                  <p className='mt-3 banner-subtitle'>
                    Khám phá kho tàng đồ cũ chất lượng với giá hấp dẫn. Mua sắm thông minh, tiết kiệm và thân thiện với
                    môi trường.
                  </p>
                  <div className='mt-3 hstack'>
                    <Button onClick={() => handleRedirect('/home')} type='primary' className='btn-custom'>
                      Mua sắm ngay
                    </Button>
                    <Button className='btn-custom border-primary'>Đăng bán</Button>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 d-none d-lg-flex'>
                <div className='p-24 banner-slider'>
                  <div className='d-flex'>
                    <div>
                      <div className='slider-img'>
                        <Image preview={false} src='/images/landingpage/banner1.png' alt='Đồ nội thất cũ' />
                      </div>
                      <div className='slider-img'>
                        <Image preview={false} src='/images/landingpage/banner1.png' alt='Đồ điện tử cũ' />
                      </div>
                    </div>
                    <div>
                      <div className='slider-img2'>
                        <Image preview={false} src='/images/landingpage/banner2.png' alt='Quần áo cũ' />
                      </div>
                      <div className='slider-img2'>
                        <Image preview={false} src='/images/landingpage/banner2.png' alt='Sách cũ' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End banner section */}

        <div className='spacer'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-8 text-center'>
                <div className='d-sm-flex align-items-center justify-content-center'>
                  <div className='me-1 d-flex align-items-center justify-content-center social-chips'>
                    <Image
                      preview={false}
                      src='images/profile/user-2.jpg'
                      width={30}
                      alt='social'
                      className='rounded-circle '
                    />
                    <Image
                      preview={false}
                      src='images/profile/user-3.jpg'
                      width={30}
                      alt='social'
                      className='rounded-circle '
                    />
                    <Image
                      preview={false}
                      src='images/profile/user-4.jpg'
                      width={30}
                      alt='social'
                      className='rounded-circle '
                    />
                  </div>
                  <span className='fs-6  '>
                    <span className='fw-bold'>52,589+</span> người dùng đã tin tưởng và sử dụng dịch vụ của chúng tôi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start testimonial section */}
        <div className='spacer testimonial-section'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-8 col-sm-11'>
                <h2 className='section-title text-center'>Đánh giá từ khách hàng của chúng tôi</h2>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-lg-4 col-sm-6'>
                <div className='cardWithShadow'>
                  <div className='p-3'>
                    <div className='d-flex align-items-center'>
                      <Image
                        preview={false}
                        src='images/profile/user-7.jpg'
                        alt='profile'
                        className='rounded-circle'
                        width={40}
                      />
                      <div className='d-flex align-items-center justify-content-between w-100'>
                        <div className='ms-2'>
                          <div className='fw-bold'>Trương Chính </div>
                          <span>Khách hàng</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className='ms-5 star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      Tôi rất hài lòng với trải nghiệm mua sắm tại ESOLD. Sản phẩm chất lượng, giá cả hợp lý. Giao diện
                      dễ sử dụng và quá trình đặt hàng rất thuận tiện.
                    </p>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-sm-6'>
                <div className='cardWithShadow'>
                  <div className='p-3'>
                    <div className='d-flex align-items-center'>
                      <Image
                        preview={false}
                        src='images/profile/user-5.jpg'
                        alt='profile'
                        className='rounded-circle'
                        width={40}
                      />
                      <div className='d-flex align-items-center justify-content-between w-100'>
                        <div className='ms-2'>
                          <div className='fw-bold'>Quách Đạt </div>
                          <span>Khách hàng</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className='ms-5 star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      ESOLD là nơi tuyệt vời để tìm kiếm đồ cũ chất lượng. Tôi đã mua được nhiều món đồ ưng ý với giá rẻ
                      hơn rất nhiều so với mua mới. Dịch vụ khách hàng cũng rất tốt.
                    </p>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-sm-6'>
                <div className='cardWithShadow'>
                  <div className='p-3'>
                    <div className='d-flex align-items-center'>
                      <Image
                        preview={false}
                        src='images/profile/user-6.jpg'
                        alt='profile'
                        className='rounded-circle'
                        width={40}
                      />
                      <div className='d-flex align-items-center justify-content-between w-100'>
                        <div className='ms-2'>
                          <div className=' fw-bold '>Hồ Lý</div>
                          <span>Khách hàng</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className=' star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      Tôi rất thích cách ESOLD kết nối người bán và người mua. Việc đăng bán đồ cũ rất dễ dàng, và tôi
                      đã kiếm được một khoản tiền kha khá từ những món đồ không còn sử dụng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End testimonial section */}

        {/* Features */}
        <div className='spacer'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-6 col-sm-8'>
                <span className='text-primary text-uppercase d-block text-center f-w-500'>TÍNH NĂNG NỔI BẬT</span>
                <h2 className='section-title text-center m-t-16'>
                  Các tính năng hữu ích của nền tảng mua bán đồ cũ ESOLD
                </h2>
              </div>
            </div>

            <div className='row mt-5'>
              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-search'></i>
                <h6 className='m-0 mb-1 mt-3'>Tìm kiếm thông minh</h6>
                <span className='mb-3 feature-detail d-block'>
                  Dễ dàng tìm kiếm sản phẩm với bộ lọc đa dạng và chính xác.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-lock'></i>
                <h6 className='m-0 mb-1 mt-3'>Bảo mật thông tin</h6>
                <span className='mb-3 feature-detail d-block'>
                  Đảm bảo an toàn và riêng tư cho thông tin người dùng.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-tags'></i>
                <h6 className='m-0 mb-1 mt-3'>Đa dạng danh mục</h6>
                <span className='mb-3 feature-detail d-block'>
                  Hỗ trợ nhiều loại sản phẩm từ đồ điện tử đến quần áo, nội thất.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-history'></i>
                <h6 className='m-0 mb-1 mt-3'>Lịch sử giao dịch</h6>
                <span className='mb-3 feature-detail d-block'>Theo dõi lịch sử mua bán và đánh giá sản phẩm.</span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-bell'></i>
                <h6 className='m-0 mb-1 mt-3'>Thông báo thông minh</h6>
                <span className='mb-3 feature-detail d-block'>Nhận thông báo về sản phẩm mới và ưu đãi.</span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-camera'></i>
                <h6 className='m-0 mb-1 mt-3'>Đăng bán dễ dàng</h6>
                <span className='mb-3 feature-detail d-block'>
                  Nhanh chóng đăng bán sản phẩm với vài bước đơn giản.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-comments'></i>
                <h6 className='m-0 mb-1 mt-3'>Chat trực tiếp</h6>
                <span className='mb-3 feature-detail d-block'>
                  Trao đổi trực tiếp với người bán để biết thêm thông tin sản phẩm.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-mobile-alt'></i>
                <h6 className='m-0 mb-1 mt-3'>Tương thích đa thiết bị</h6>
                <span className='mb-3 feature-detail d-block'>Sử dụng trên máy tính, điện thoại và máy tính bảng.</span>
              </div>
            </div>
          </div>
        </div>

        {/* End Features */}

        {/* FAQ */}
        <div className='container spacer-bottom'>
          <div className='row justify-content-center'>
            <div className='col-sm-10 col-lg-6'>
              <div className='cardWithShadow shape-card bg-size-cover'>
                <div className='p-32 text-center'>
                  <h3 className='m-0 mt-2 mat-subtitle-1'>Bạn có thắc mắc về việc mua bán đồ cũ?</h3>
                  <span className='mt-1 d-block'>Chúng tôi luôn sẵn sàng hỗ trợ bạn</span>
                  <div className='mt-4 mb-2  justify-content-center'>
                    <Button className='btn-custom me-3 mt-2' type='primary'>
                      Chat với nhân viên hỗ trợ
                    </Button>
                    <Button className='btn-custom border-primary mt-2'>Xem câu hỏi thường gặp</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End FAQ */}

        {/* Use app */}
        <div className='use-app-section spacer-sm'>
          <div className='container'>
            <div className='row justify-content-between'>
              <div className='col-lg-5'>
                <h3 className='mt-0 section-title2 text-white mb-4'>
                  Mua bán đồ cũ dễ dàng mọi lúc, mọi nơi với website ESOLD trên cả máy tính và điện thoại di động
                </h3>
                <div className='hstack '>
                  <Button className='text-primary btn-custom sm bg-white '>Bắt đầu ngay</Button>
                  <Button color='white' type='primary' className='btn-custom sm text-white  border-white'>
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
              <div className='col-lg-5 text-right'>
                <Image preview={false} src='images/landingpage/background/c2a.png' alt='Mobile App' width={330} />
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='c2a-card bg-size-cover '>
            <div className='p-3'>
              <div className='hstack justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <Image preview={false} src='images/landingpage/shape/badge.svg' alt='badge' />

                  <div className='ms-3'>
                    <h5 className=' mat-subtitle-1 mb-1'>Bảo mật thông tin 100%</h5>
                    <span>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn trong quá trình mua bán.</span>
                  </div>
                </div>
                <Button type='primary' className='btn-custom'>
                  Khám phá ngay
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* End Use app */}
      </Content>
      <footer className='py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-sm-5 col-lg-4 text-center'>
              <span>
                <Image height={80} preview={false} src='images/logo.png' alt='logo' />
              </span>
              <div className='f-s-14 m-t-8'>
                All rights reserved, designed & developed by
                <Link href='/' className='mat-subtitle-2 ms-1'>
                  Ninehcobra-Bale-Bros{' '}
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
