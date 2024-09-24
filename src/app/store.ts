import { configureStore } from '@reduxjs/toolkit'
import getCashFlowSlice from './slices/getCashFlowSlice'

export const store = configureStore({
  reducer: {
    getCashFlowSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch