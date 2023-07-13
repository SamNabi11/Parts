import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Login/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
