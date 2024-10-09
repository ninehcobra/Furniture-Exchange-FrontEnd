import { fetchBaseQuery, FetchBaseQueryArgs } from '@reduxjs/toolkit/query/react'
import { enviroment } from '@/environments/environment'
import { getFromLocalStorage } from '../../utils/local-storage'

interface CustomQueryOptions extends Partial<FetchBaseQueryArgs> {
  additionalPath?: string
  customHeaders?: Record<string, string>
}

export const baseQuery = (options: CustomQueryOptions = {}): any =>
  fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}${options.additionalPath || ''}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access-token')
      if (token && typeof token === 'string') {
        headers.set('Authorization', `Bearer ${token}`)
      }
      if (options.customHeaders) {
        Object.entries(options.customHeaders).forEach(([key, value]) => {
          headers.set(key, value)
        })
      }
      return headers
    },
    ...options
  })
