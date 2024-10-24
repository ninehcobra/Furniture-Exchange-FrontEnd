/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type */
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import Cookies from 'js-cookie'

export const baseQueryWithAuth = (url: string) => {
  return fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access-token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  })
}
