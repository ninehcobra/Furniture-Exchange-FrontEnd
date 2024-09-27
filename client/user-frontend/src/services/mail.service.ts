import { ILoginResponse, IRegisterPayload, IRegisterResponse } from '@/types/auth'
import { IMailPayload, IMailResponse } from '@/types/mail'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3.1.103.136/api/v1/auth'
  }),
  endpoints: (builder) => ({
    sendMail: builder.mutation<IMailResponse, IMailPayload>({
      query: (body) => ({
        url: '/send-mail',
        method: 'POST',
        body
      })
    })
  })
})

export const { useSendMailMutation } = mailApi
