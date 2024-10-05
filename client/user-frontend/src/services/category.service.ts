import { enviroment } from '@/environments/environment'
import { ICategory } from '@/types/category'
import { IMailPayload, IMailResponse } from '@/types/mail'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { get } from 'http'

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
    })
  })
})

export const { useGetCategoriesQuery } = categoryApi
