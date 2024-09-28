import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse
} from '@/types/auth'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3.1.103.136/api/v1/auth'
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
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
