'use client'
import { useParams } from 'next/navigation'
import { useGetCategoriesQuery, useGetProductByCategorySlugQuery } from '@/services/category.service'
import ProductList from '@/app/home/components/ProductList'
import { ReactNode, useMemo } from 'react'
import { Card, Spin, Alert } from 'antd'

export default function CategoryPage(): ReactNode {
  const params = useParams()
  const { slug } = params

  const { data: categories } = useGetCategoriesQuery()
  const { data: categoryProducts, isLoading, error } = useGetProductByCategorySlugQuery(slug as string)

  const categoryName = useMemo<string>(() => {
    const category = categories?.find((cat) => cat.slug === slug)
    return category ? category.name : 'Unknown Category'
  }, [categories, slug])

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Spin size='large' tip='Loading products...' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Alert message='Error' description='Error loading products' type='error' showIcon />
      </div>
    )
  }

  return (
    <div className='container mt-4'>
      <Card title={`Các sản phẩm trong danh mục ${categoryName}`} bordered={false} className='mb-4'>
        <ProductList products={categoryProducts?.products || []} />
      </Card>
    </div>
  )
}
