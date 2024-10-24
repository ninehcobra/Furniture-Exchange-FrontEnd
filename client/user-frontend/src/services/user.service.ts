import { enviroment } from '@/environments/environment'

import { IUser } from '@/types/user'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './base.service'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth(enviroment.apiUrl),
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUser, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET'
      })
    })
  })
})

export const { useGetUserProfileQuery } = userApi
