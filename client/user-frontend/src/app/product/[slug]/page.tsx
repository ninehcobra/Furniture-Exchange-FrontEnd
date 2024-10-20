/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'
import { Carousel, Spin } from 'antd'
import { useState, useRef, useEffect, useMemo } from 'react'
import './product-detail.scss'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useGetProductBySlugQuery } from '@/services/product.service'
import { useRouter } from 'next/navigation'
import { useGetCategoriesQuery, useGetProductByCategorySlugQuery } from '@/services/category.service'
import { IProduct } from '@/types/product'
import { ICategory } from '@/types/category'
import Image from 'next/image'
import moment from 'moment'
import GoogleAdUnit from 'nextjs13_google_adsense'

export default function Page({ params }: { params: { slug: string } }): React.ReactNode {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const carouselRef = useRef<any>(null)
  const [images, setImages] = useState<string[]>([])
  const [startIndex, setStartIndex] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const visibleImages: number = 8
  const maxLines: number = 6

  const router = useRouter()
  const { data: categories } = useGetCategoriesQuery()
  const { data: product, isLoading, error } = useGetProductBySlugQuery(params.slug)

  const categoryName: string = useMemo<string>(() => {
    if (product && categories) {
      const category: ICategory | undefined = categories.find((cat: ICategory) => cat.id === product.category_id)
      return category ? category.name : 'Unknown Category'
    }
    return 'Loading...'
  }, [product, categories])

  const categorySlug: string = useMemo<string>(() => {
    if (product && categories) {
      const category: ICategory | undefined = categories.find((cat: ICategory) => cat.id === product.category_id)
      return category ? category.slug : 'Unknown Category'
    }
    return 'Loading...'
  }, [product, categories])

  const { data: categoryProducts } = useGetProductByCategorySlugQuery(categorySlug, {
    skip: categorySlug === 'Loading...'
  })

  const filteredCategoryProducts: IProduct[] = useMemo<IProduct[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => {
      if (categoryProducts && product) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return categoryProducts.products.filter((p: IProduct) => p.id !== product.id)
      }
      return []
    },
    [categoryProducts, product]
  )

  useEffect(() => {
    if (product && product.image_urls) {
      setImages(product.image_urls)
    }
  }, [product])

  useEffect(() => {
    const checkOverflow = (): void => {
      if (descriptionRef.current) {
        const isOverflowing: boolean = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
        setIsOverflowing(isOverflowing)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return (): void => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [product])

  const onChange = (currentSlide: number): void => {
    setActiveSlide(currentSlide)
  }

  const handleHover = (index: number): void => {
    setActiveSlide(index)
    carouselRef.current?.goTo(index)
  }

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

  const toggleDescription = (): void => {
    setIsExpanded(!isExpanded)
  }

  const truncateName = (name: string, maxLength: number): string => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  const formatTime = (createdAt: string): string => {
    moment.locale('vi')
    return moment(createdAt).fromNow() ?? ''
  }

  if (isLoading) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Spin size='large' tip='Loading...'></Spin>
      </div>
    )
  }

  if (error || !product) {
    router.push('/home')
    return null
  }
  const getImageUrl = (urlString: string): string => {
    try {
      const parsed = JSON.parse(urlString)
      return Array.isArray(parsed) ? parsed[0] : parsed
    } catch {
      return urlString
    }
  }

  return (
    <div className='detail-container container mb-3'>
      {/* <GoogleAdUnit>
        <ins
          className='adsbygoogle'
          style={{ display: 'block', width: '100%' }}
          data-ad-client='ca-pub-6214420931907905'
          data-ad-slot='5832681765'
          data-ad-format='auto'
          data-full-width-responsive='true'
        ></ins>
      </GoogleAdUnit> */}
      <img
        src='/images/banner/banner-ads-1.png'
        className='w-100 my-2 rounded'
        style={{ objectFit: 'cover' }}
        alt='banner-ads-1'
        height={120}
      />
      <div className='row g-2'>
        <div className='col-8 position-relative '>
          <button className='btn btn-link position-absolute top-0 end-0 d-flex align-items-center justify-content-center m-2 mt-1'>
            <i className='fa-solid fa-share'></i>
          </button>
          <button className='btn btn-link position-absolute top-0 end-0 d-flex align-items-center justify-content-center m-2 mt-1 me-5'>
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
                <img src={image} className='product-image w-100' alt={`Product image ${index + 1}`} />
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
                    width: '12.5%'
                  }}
                >
                  <img
                    src={image}
                    className='product-image-slider w-100'
                    alt={`Product thumbnail ${startIndex + index + 1}`}
                  />
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
              ref={descriptionRef}
              className={`mt-2 body-s text-description mb-3 ${isExpanded ? '' : 'description-truncate'}`}
              style={{ '--max-lines': maxLines } as React.CSSProperties}
            >
              {product.description}
            </div>
            {isOverflowing && (
              <div className='m-2 btn-more text-center py-2 fw-bold' onClick={toggleDescription}>
                {isExpanded ? 'Rút gọn' : 'Xem thêm'}
              </div>
            )}
          </div>
        </div>
        <div className='col-4'>
          <div className='w-100 p-2 product-info'>
            <div className='body-m fw-bold'>{product.name}</div>
            <div className='body-s category-text dashed-text pt-2 pb-1'>{`Loại mặt hàng: ${categoryName}`}</div>
            <div className='d-flex mt-2 align-items-center'>
              <div
                className='d-flex align-items-center justify-content-center mx-3'
                style={{ height: '40px', width: '15px' }}
              >
                <i className='fa-solid fa-location-dot'></i>
              </div>
              <div className=' body-s '>{`${product.address_line}, ${product.district}, ${product.province}`}</div>
            </div>
            <div className='d-flex align-items-center'>
              <div
                className='d-flex align-items-center justify-content-center mx-3'
                style={{ height: '40px', width: '15px' }}
              >
                <i className='fa-regular fa-clock'></i>
              </div>
              <div className=' body-s '>{`Đăng ${new Date(product.created_at).toLocaleString()}`}</div>
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
                <div className='body-m fw-bold'>Seller Name</div>
                <div className='body-s  body-xs pb-1'>Hoạt động gần đây</div>
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
              <div className='body-s px-3 py-2 sample-chat d-inline-block'>Mặt hàng này còn không ạ?</div>
              <div className='body-s px-3 py-2 sample-chat d-inline-block ms-2'>Bạn có đó không?</div>
            </div>
          </div>
          <img
            src='/images/banner/banner-ads-2.png'
            className='w-100 my-2 rounded'
            style={{ objectFit: 'cover', border: '1px solid #e0e0e0' }}
            alt='banner-ads-1'
            height={236}
          />
        </div>
      </div>

      <div className='product-description product-same p-3 pb-1 my-2 pb-3'>
        <div className='fw-bold same-title body-m pb-2'>Tin đăng tương tự</div>
        <div className='row g-2'>
          {filteredCategoryProducts.map((product: IProduct) => {
            return (
              <div key={product.id} className='col-2 g-0'>
                <div
                  onClick={() => {
                    router.push(`/product/${product.slug}`)
                  }}
                  className='product-card product-same-card p-2'
                >
                  <div className='product-image-container position-relative'>
                    <span className='position-absolute top-0 end-0 badge state-badge  m-2'>
                      {product.state === 'new' ? 'Mới' : 'Đã qua sử dụng'}
                    </span>
                    <button className='btn d-flex align-items-center justify-content-center btn-link position-absolute text-center bottom-0 end-0 p-2 m-1'>
                      <i className='fa-regular fa-heart body-m'></i>
                    </button>
                    {product.image_urls && product.image_urls.length > 0 && (
                      <img
                        src={product.image_urls[0] ? product.image_urls[0] : 'https://via.placeholder.com/150'}
                        alt={product.name || 'Product image'}
                        className='same-product-image w-100'
                      />
                    )}
                  </div>
                  <div className='card-body d-flex flex-column p-2'>
                    <div className='card-title body-s m-0'>{truncateName(product.name, 20)}</div>
                    <div className='card-text body-xs category-text'>{categoryName || 'Unknown Category'}</div>
                    <div className='card-text price-text body-s text-primary fw-bold'>{formatPrice(product.price)}</div>
                    <div className='card-text time-district-text body-xs mt-4'>
                      <i className='fa-solid fa-couch me-1'></i>
                      {formatTime(product.created_at)} • {product.district}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}{' '}
        </div>
      </div>
      <img
        src='/images/banner/banner-2.jpg'
        className='w-100 my-2 rounded'
        style={{ objectFit: 'cover', border: '1px solid #e0e0e0' }}
        alt='banner-ads-1'
      />
    </div>
  )
}
