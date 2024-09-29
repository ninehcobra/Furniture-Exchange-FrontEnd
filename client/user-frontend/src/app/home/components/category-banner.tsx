/* eslint-disable @next/next/no-img-element */
import './category-banner.scss'

export default function CategoryBanner(): React.ReactNode {
  return (
    <div className='container w-100 category-banner mt-3'>
      <div className='p-3 heading-h6'>Danh mục</div>
      <div className='row category-banner-list'>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-1.webp' alt='banner' />
            <div className='text-center body-s'>Thiết bị điện tử</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-2.webp' alt='banner' />
            <div className='text-center body-s'>Nhà cửa và đời sống</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-3.webp' alt='banner' />
            <div className='text-center body-s'>Ô tô & xe máy</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-4.webp' alt='banner' />
            <div className='text-center body-s'>Thể thao & du lịch</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-5.webp' alt='banner' />
            <div className='text-center body-s'>Máy tính & laptop</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-6.webp' alt='banner' />
            <div className='text-center body-s'>Đồng hồ</div>
          </div>
        </div>
      </div>
      <div className='row category-banner-list'>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-1.webp' alt='banner' />
            <div className='text-center body-s'>Thiết bị điện tử</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-2.webp' alt='banner' />
            <div className='text-center body-s'>Nhà cửa và đời sống</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-3.webp' alt='banner' />
            <div className='text-center body-s'>Ô tô & xe máy</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-4.webp' alt='banner' />
            <div className='text-center body-s'>Thể thao & du lịch</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-5.webp' alt='banner' />
            <div className='text-center body-s'>Máy tính & laptop</div>
          </div>
        </div>
        <div className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
          <div className='category-image  d-flex flex-column align-items-center justify-content-center'>
            <img src='./images/category/ct-6.webp' alt='banner' />
            <div className='text-center body-s'>Đồng hồ</div>
          </div>
        </div>
      </div>
    </div>
  )
}
