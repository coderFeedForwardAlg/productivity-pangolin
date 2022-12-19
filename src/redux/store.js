import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './color'

export const store = configureStore({
  reducer: {
    color: colorReducer
  }
})