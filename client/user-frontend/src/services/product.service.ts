import { enviroment } from '@/environments/environment'
import { IMailPayload, IMailResponse } from '@/types/mail'
import { ICreateProductPayload, IProduct } from '@/types/product'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}/products`
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: '/',
        method: 'GET'
      })
    }),
    createProduct: builder.mutation<IProduct, ICreateProductPayload>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      })
    }),
    getProductBySlug: builder.query<IProduct, string>({
      query: (slug) => ({
        url: `/${slug}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetProductsQuery,useGetProductBySlugQuery } = productApi
