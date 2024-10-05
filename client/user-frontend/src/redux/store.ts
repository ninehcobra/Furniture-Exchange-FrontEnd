import { authApi } from '@/services/auth.service'
import { categoryApi } from '@/services/category.service'
import { mailApi } from '@/services/mail.service'
import { productApi } from '@/services/product.service'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [mailApi.reducerPath]: mailApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, mailApi.middleware, productApi.middleware, categoryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
