/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Carousel } from 'antd'
import { useState, useRef } from 'react'
import './product-detail.scss'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AdBanner } from '@/common/components/AdBanner'

export default function Page({ params }: { params: { id: string } }): React.ReactNode {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const carouselRef = useRef<any>(null)

  const onChange = (currentSlide: number): void => {
    setActiveSlide(currentSlide)
  }

  const handleHover = (index: number): void => {
    setActiveSlide(index)
    carouselRef.current?.goTo(index)
  }

  const images = [
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg',
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg',
    '/images/banner/banner-1.jpg',
    '/images/banner/banner-2.jpg',
    '/images/banner/banner-3.jpg'
  ]

  const [startIndex, setStartIndex] = useState<number>(0)
  const visibleImages = 8

  const handleNext = (): void => {
    if (startIndex + visibleImages < images.length) {
      setStartIndex(Math.min(startIndex + 1, images.length - visibleImages))
    }
  }

  const handlePrev = (): void => {
    if (startIndex > 0) {
      setStartIndex(Math.max(startIndex - 1, 0))
    }
  }

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const maxLines = 6

  const toggleDescription = (): void => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='detail-container container'>
      <div className='mb-2'>
        <AdBanner dataAdFormat='auto' dataAdSlot='5832681765' dataFullWidthResponsive={true} />
      </div>
      <div className='row g-2'>
        <div className='col-8 position-relative '>
          <button
            className='btn btn-link position-absolute top-0 end-0 d-flex align-items-center justify-content-center m-2 mt-1'
            onClick={() => console.log('Add to wishlist')}
          >
            <i className='fa-solid fa-share'></i>
          </button>
          <button
            className='btn btn-link position-absolute top-0 end-0 d-flex align-items-center justify-content-center m-2 mt-1 me-5'
            onClick={() => console.log('Add to wishlist')}
          >
            <i className='fa-regular fa-heart'></i>
          </button>
          <Carousel
            ref={carouselRef}
            arrows={true}
            draggable={true}
            className='w-100 '
            style={{ height: '412px', borderRadius: '7px' }}
            afterChange={onChange}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} className='product-image w-100' alt='anh banner' />
              </div>
            ))}
          </Carousel>

          <div className='slider-container position-relative'>
            <div className='d-flex mt-2 overflow-hidden'>
              {images.slice(startIndex, startIndex + visibleImages).map((image, index) => (
                <div
                  key={startIndex + index}
                  onMouseEnter={() => handleHover(startIndex + index)}
                  className='me-2 flex-shrink-0'
                  style={{
                    borderRadius: '7px',
                    border: activeSlide === startIndex + index ? '2px solid #007bff' : 'none',
                    width: '12.5%' // 100% / 8 = 12.5%
                  }}
                >
                  <img src={image} className='product-image-slider w-100' alt='anh banner' />
                </div>
              ))}
            </div>
            <button
              className='slider-button prev'
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <LeftOutlined />
            </button>
            <button
              className='slider-button next'
              onClick={handleNext}
              disabled={startIndex + visibleImages >= images.length}
              style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <RightOutlined />
            </button>
          </div>

          <div className='product-description p-3 pb-1 my-2'>
            <div className='fw-bold text-secondary'>Mô tả chi tiết</div>
            <div
              className={`mt-2 body-s text-description mb-3 ${isExpanded ? '' : 'description-truncate'}`}
              style={{ '--max-lines': maxLines } as React.CSSProperties}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio, ipsa ratione
              consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil illo,
              voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio,
              ipsa ratione consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil
              illo, voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veritatis distinctio,
              ipsa ratione consequuntur iusto provident laboriosam quibusdam? Voluptatem consectetur consequuntur nihil
              illo, voluptates excepturi rerum aspernatur asperiores eum fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi veritatis distinctio, ipsa ratione consequuntur iusto provident laboriosam
              quibusdam? Voluptatem consectetur consequuntur nihil illo, voluptates excepturi rerum aspernatur
              asperiores eum fugit.
            </div>
            <div className='m-2 btn-more text-center py-2 fw-bold' onClick={toggleDescription}>
              {isExpanded ? 'Rút gọn' : 'Xem thêm'}
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='w-100 p-2 product-info'>
            <div className='body-m fw-bold'>Porsche Panamera 2019 lướt keng</div>
            <div className='body-s category-text pt-2 pb-1'>2019 . 30000 km . Xăng . Tự động</div>
            <div className='d-flex mt-2 align-items-center'>
              <div
                className='d-flex align-items-center justify-content-center mx-3'
                style={{ height: '40px', width: '15spx' }}
              >
                <i className='fa-solid fa-location-dot'></i>
              </div>
              <div className=' body-s '>Phường Phú Thọ Hòa, Quận Tân Phú, Tp Hồ Chí Minh</div>
            </div>
            <div className='d-flex align-items-center'>
              <div
                className='d-flex align-items-center justify-content-center mx-3'
                style={{ height: '40px', width: '15spx' }}
              >
                <i className='fa-regular fa-clock'></i>
              </div>
              <div className=' body-s '>Đăng 10 giờ trước</div>
            </div>
          </div>

          <div className='w-100 p-2 product-info mt-2'>
            <div className='d-flex align-items-center'>
              <img
                src='/images/profile/user-1.jpg'
                alt='user'
                className='user-avatar rounded-circle me-3'
                height={40}
                width={40}
              />
              <div>
                <div className='body-m fw-bold'>Xe lướt miền nam</div>
                <div className='body-s  body-xs pb-1'>Hoạt động 3 giờ trước - Phản hồi: 83%</div>
              </div>
            </div>
            <div className='d-flex mt-2 align-items-center flex-column'>
              <div className='w-100 py-2 text-center btn-contact fw-bold'>
                <i className='fa-solid fa-phone me-2'></i>
                Gọi điện
              </div>
              <div className='w-100 py-2 text-center btn-contact fw-bold mt-2'>
                <i className='fa-solid fa-message me-2'></i>
                Chat
              </div>
            </div>

            <div className='mt-2 mb-2 d-flex'>
              <div className='body-s px-3 py-2 sample-chat d-inline-block'>Mặc hàng này còn không ạ?</div>
              <div className='body-s px-3 py-2 sample-chat d-inline-block ms-2'>Bạn có đó không?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
