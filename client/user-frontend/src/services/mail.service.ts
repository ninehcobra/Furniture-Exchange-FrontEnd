import { enviroment } from '@/environments/environment'
import { IMailPayload, IMailResponse } from '@/types/mail'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${enviroment.apiUrl}/auth`
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
