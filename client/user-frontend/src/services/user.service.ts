import { enviroment } from '@/environments/environment'

import { IUser } from '@/types/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}/users`
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUser, void>({
      query: () => ({
        url: '/profile',
        method: 'GET'
      })
    })
  })
})

export const { useGetUserProfileQuery } = userApi
