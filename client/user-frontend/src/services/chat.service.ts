/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { enviroment } from '@/environments/environment'

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './base.service'
import { IGetConversationResponse } from '@/types/chat'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithAuth(enviroment.apiUrl),
  endpoints: (builder) => ({
    getConversation: builder.query<IGetConversationResponse, void>({
      query: () => ({
        url: '/conversations',
        method: 'GET'
      })
    })
  })
})
export const { useGetConversationQuery } = chatApi
