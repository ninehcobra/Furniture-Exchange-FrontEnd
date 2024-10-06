/* eslint-disable @next/next/no-img-element */
'use client'

import { Carousel } from 'antd'
import './home-banner.scss'

export default function HomeBanner(): React.ReactNode {
  const onChange = (currentSlide: number): void => {}

  const bannerButtons = [
    { src: './images/btn-background-image/btn-1.png', title: 'Voucher giảm giá 10%' },
    { src: './images/btn-background-image/btn-2.png', title: 'Miễn phí ship' },
    { src: './images/btn-background-image/btn-3.png', title: 'Săn sale' },
    { src: './images/btn-background-image/btn-4.png', title: 'Mã giảm giá' },
    { src: './images/btn-background-image/btn-5.png', title: 'ESOLD siêu rẻ' },
    { src: './images/btn-background-image/btn-6.png', title: 'Voucher giảm giá 30%' },
    { src: './images/btn-background-image/btn-7.png', title: 'Hàng quốc tế' },
    { src: './images/btn-background-image/btn-8.png', title: 'Dịch vụ khác' }
  ]

  return (
    <div className='home-banner'>
      <div className='container pt-4'>
        <div className='d-flex' style={{ maxHeight: '240px' }}>
          <Carousel autoplay style={{ width: '800px', borderRadius: '4px' }} afterChange={onChange}>
            <div>
              <img src='./images/banner/banner-1.jpg' className='h-100 w-100' alt='anh banner' />
            </div>
            <div>
              <img src='./images/banner/banner-2.jpg' className='h-100 w-100' alt='anh banner' />
            </div>
            <div>
              <img src='./images/banner/banner-3.jpg' className='h-100 w-100' alt='anh banner' />
            </div>
          </Carousel>
          <div className='ps-1'>
            <img
              src='./images/banner/banner-4.jpg'
              style={{ height: '120px', borderRadius: '4px' }}
              className=' w-100 pb-1'
              alt='anh banner'
            />
            <img
              src='./images/banner/banner-5.jpg'
              style={{ height: '120px', borderRadius: '4px' }}
              className=' w-100 '
              alt='anh banner'
            />
          </div>
        </div>
        <div className='w-100 mt-3 mb-2 row row-cols-8 g-3'>
          {bannerButtons.map((button, index) => (
            <div key={index} className='col'>
              <div className='d-flex flex-column align-items-center'>
                <img alt='banner-btn' className='banner-btn ' src={button.src} />
                <p className='text-center body-xs mt-1'>{button.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
