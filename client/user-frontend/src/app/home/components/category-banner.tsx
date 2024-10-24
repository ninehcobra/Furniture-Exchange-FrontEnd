/* eslint-disable @next/next/no-img-element */
'use client'
import './category-banner.scss'
import { useGetCategoriesQuery } from '@/services/category.service'
import Link from 'next/link'

export default function CategoryBanner(): React.ReactNode {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  if (isLoading) return <div></div>
  if (error) return <div>Error loading categories</div>

  // Skip the first 6 categories and take the next 6
  const displayCategories = categories?.slice(6, 12) || []

  return (
    <div className='container w-100 category-banner mt-3'>
      <div className='p-3 heading-h6'>Danh mục</div>
      <div className='row category-banner-list'>
        {displayCategories.map((category) => (
          <div key={category.id} className='col-2 p-0 category-item d-flex align-items-center justify-content-center'>
            <Link className='category-link' href={`/category/${category.slug}`}>
              <div className='category-image d-flex flex-column align-items-center justify-content-center'>
                <img
                  src={category.image_url}
                  alt={category.name}
                  width={70}
                  height={70}
                  className='category-image mb-1'
                />
                <div className='text-center body-s'>{category.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
