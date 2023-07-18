import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import userReducer from '../features/Login/userSlice';
import partReducer from '../features/PartNumber/partSlice';

const reducer = combineReducers({
    user: userReducer,
    part: partReducer
})

export const store = configureStore({
    reducer
});
