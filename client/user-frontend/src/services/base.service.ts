/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchBaseQuery, FetchBaseQueryArgs } from '@reduxjs/toolkit/query/react'
import { enviroment } from '@/environments/environment'
import { parseCookies } from 'nookies'

interface CustomQueryOptions extends Partial<FetchBaseQueryArgs> {
  additionalPath?: string
  customHeaders?: Record<string, string>
}

export const baseQuery = (options: CustomQueryOptions = {}): any =>
  fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}${options.additionalPath || ''}`,
    prepareHeaders: (headers, { getState }) => {
      const cookies = parseCookies()
      const token = cookies['access-token']
      if (token) {
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
