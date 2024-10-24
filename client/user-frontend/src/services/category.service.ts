import { enviroment } from '@/environments/environment'
import { ICategory, IGetProductByCategorySlugResponse } from '@/types/category'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}/categories`
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/',
        method: 'GET'
      })
    }),
    getProductByCategorySlug: builder.query<IGetProductByCategorySlugResponse, string>({
      query: (slug) => ({
        url: `/${slug}/products`,
        method: 'GET'
      })
    })
  })
})

export const { useGetCategoriesQuery, useGetProductByCategorySlugQuery } = categoryApi
