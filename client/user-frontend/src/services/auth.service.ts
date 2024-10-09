import { enviroment } from '@/environments/environment'
import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse
} from '@/types/auth'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { saveToLocalStorage } from '../../utils/local-storage'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}/auth`
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          saveToLocalStorage('access-token', data.accessToken)
          saveToLocalStorage('refresh-token', data.refreshToken)
        } catch (error) {
          // Handle error
        }
      }
    }),
    register: builder.mutation<IRegisterResponse, IRegisterPayload>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body
      })
    }),
    verifyEmail: builder.mutation<IVerifyEmailResponse, IVerifyEmailPayload>({
      query: (body) => ({
        url: '/verify-email',
        method: 'POST',
        body
      })
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation } = authApi
