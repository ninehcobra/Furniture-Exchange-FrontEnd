'use client'
import { Layout, Image, Menu, MenuProps, Button, Rate } from 'antd'
import { FileSearchOutlined, HomeOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons'
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
      key: 'results',
      label: 'Kết quả khám',
      icon: <FileSearchOutlined />,
      children: [
        { key: 'ultrasound', label: 'Siêu âm' },
        { key: 'xray', label: 'X-quang' },
        { key: 'blood', label: 'Xét nghiệm máu' },
        { key: 'other', label: 'Khác' }
      ]
    },
    {
      key: 'patient',
      label: 'Thông tin bệnh nhân',
      icon: <UserOutlined />
    }
  ]

  const handleRedirect = (key: string): void => {
    router.push(key)
  }
  return (
    <Layout>
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
                    <MedicineBoxOutlined className='me-1 welcome-icon' /> Chào mừng đến với
                  </span>
                  <h1 className='banner-title m-0'>
                    Hệ thống xem kết quả khám bệnh<span className='text-primary'> Bệnh viện Quân Y 7A</span>
                  </h1>
                  <p className='mt-3 banner-subtitle'>
                    Tra cứu kết quả khám bệnh nhanh chóng, chính xác và bảo mật. Hỗ trợ xem kết quả siêu âm, X-quang và
                    các xét nghiệm khác.
                  </p>
                  <div className='mt-3 hstack'>
                    <Button onClick={() => handleRedirect('/')} type='primary' className='btn-custom'>
                      Sử dụng ngay
                    </Button>
                    <Button className='btn-custom border-primary'>Xem hướng dẫn</Button>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 d-none d-lg-flex'>
                <div className='p-24 banner-slider'>
                  <div className='d-flex'>
                    <div>
                      <div className='slider-img'>
                        <Image preview={false} src='/images/landingpage/bannerimg1.svg' alt='Siêu âm' />
                      </div>
                      <div className='slider-img'>
                        <Image preview={false} src='/images/landingpage/bannerimg1.svg' alt='X-quang' />
                      </div>
                    </div>
                    <div>
                      <div className='slider-img2'>
                        <Image preview={false} src='/images/landingpage/bannerimg2.svg' alt='Xét nghiệm máu' />
                      </div>
                      <div className='slider-img2'>
                        <Image preview={false} src='/images/landingpage/bannerimg2.svg' alt='Bác sĩ' />
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
                    <span className='fw-bold'>52,589+</span> bệnh nhân đã tin tưởng và sử dụng dịch vụ của chúng tôi
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
                <h2 className='section-title text-center'>Đánh giá từ bệnh nhân của chúng tôi</h2>
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
                          <span>Bệnh nhân</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className='ms-5 star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      Tôi rất hài lòng với dịch vụ khám chữa bệnh tại đây. Bác sĩ tận tình, nhân viên chu đáo. Hệ thống
                      xem kết quả trực tuyến rất tiện lợi và dễ sử dụng.
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
                          <span>Bệnh nhân</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className='ms-5 star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      Bệnh viện có cơ sở vật chất hiện đại, sạch sẽ. Tôi đặc biệt ấn tượng với khả năng xem kết quả khám
                      online, giúp tiết kiệm thời gian và thuận tiện theo dõi.
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
                          <span>Bệnh nhân</span>
                        </div>
                        <div>
                          <Rate defaultValue={5} className=' star-rating' />
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 mb-0'>
                      Đội ngũ y bác sĩ chuyên nghiệp và tận tâm. Hệ thống tra cứu kết quả khám bệnh online rất hữu ích,
                      giúp tôi dễ dàng theo dõi tình trạng sức khỏe của mình.
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
                  Các tính năng hữu ích của hệ thống xem kết quả khám bệnh
                </h2>
              </div>
            </div>

            <div className='row mt-5'>
              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-laptop-medical'></i>
                <h6 className='m-0 mb-1 mt-3'>Xem kết quả online</h6>
                <span className='mb-3 feature-detail d-block'>
                  Truy cập kết quả khám bệnh mọi lúc, mọi nơi qua internet.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-lock'></i>
                <h6 className='m-0 mb-1 mt-3'>Bảo mật thông tin</h6>
                <span className='mb-3 feature-detail d-block'>
                  Đảm bảo an toàn và riêng tư cho thông tin bệnh nhân.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-file-medical'></i>
                <h6 className='m-0 mb-1 mt-3'>Đa dạng loại kết quả</h6>
                <span className='mb-3 feature-detail d-block'>
                  Hỗ trợ xem kết quả siêu âm, X-quang, xét nghiệm máu và nhiều loại khác.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-history'></i>
                <h6 className='m-0 mb-1 mt-3'>Lịch sử khám bệnh</h6>
                <span className='mb-3 feature-detail d-block'>
                  Theo dõi lịch sử khám bệnh và kết quả qua thời gian.
                </span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-bell'></i>
                <h6 className='m-0 mb-1 mt-3'>Thông báo kết quả</h6>
                <span className='mb-3 feature-detail d-block'>Nhận thông báo ngay khi có kết quả mới.</span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-download'></i>
                <h6 className='m-0 mb-1 mt-3'>Tải kết quả</h6>
                <span className='mb-3 feature-detail d-block'>Dễ dàng tải và lưu trữ kết quả khám bệnh.</span>
              </div>

              <div className='col-sm-4 col-lg-3 text-center mb-3'>
                <i className='feature-icon fa-solid fa-share-alt'></i>
                <h6 className='m-0 mb-1 mt-3'>Chia sẻ với bác sĩ</h6>
                <span className='mb-3 feature-detail d-block'>
                  Chia sẻ kết quả an toàn với bác sĩ điều trị của bạn.
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
                  <h3 className='m-0 mt-2 mat-subtitle-1'>Bạn có còn bất kỳ thắc mắc nào không?</h3>
                  <span className='mt-1 d-block'>Đừng ngần ngại hãy liên hệ với chúng tôi</span>
                  <div className='mt-4 mb-2  justify-content-center'>
                    <Button className='btn-custom me-3 mt-2' type='primary'>
                      Hỗ trợ trực tuyến
                    </Button>
                    <Button className='btn-custom border-primary mt-2'>Những câu hỏi thường gặp</Button>
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
                  Truy cập kết quả khám bệnh mọi lúc, mọi nơi với website của chúng tôi ngay cả bằng điện thoại di động
                  của chúng tôi
                </h3>
                <div className='hstack '>
                  <Button className='text-primary btn-custom sm bg-white '>Sử dụng </Button>
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
                    <span>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn.</span>
                  </div>
                </div>
                <Button type='primary' className='btn-custom'>
                  Trải nghiệm ngay
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
                <Image preview={false} src='images/logo.png' alt='logo' />
              </span>
              <div className='f-s-14 m-t-8'>
                All rights reserved, designed & developed by
                <Link href='https://qkit.vn/' className='mat-subtitle-2 ms-1'>
                  QKIT Software{' '}
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
