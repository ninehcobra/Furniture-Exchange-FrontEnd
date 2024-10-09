/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { enviroment } from '@/environments/environment'
import { IChatMessage } from '@/types/chat'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base.service'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQuery({ additionalPath: '/conversations' }),
  endpoints: (builder) => ({
    getConversation: builder.query<IChatMessage[], void>({
      query: () => ({
        url: '/',
        method: 'GET'
      })
    })
  })
})
export const { useGetConversationQuery } = chatApi
