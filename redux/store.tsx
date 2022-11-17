import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { searchApi } from '../api/search'
import appReducer from './slices/app'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [searchApi.reducerPath]: searchApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    searchApi.middleware
  )
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
