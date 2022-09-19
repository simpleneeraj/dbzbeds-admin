import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";


const store = configureStore({
  reducer: {
    user: userSlice.reducer,

  },
  devTools: process.env.NODE_ENV === 'development'
})
export default store;