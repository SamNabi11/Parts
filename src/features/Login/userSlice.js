import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        value: null,
    },
    reducers: {
        login: (state,action) => {
            return {
                ...state,
                value: action.payload
            }
        },

        logout:(state) =>{
            return {
                ...state,
                value: null
            }
        },
    },
});

export const{login , logout} = userSlice.actions;
export const selectUser = (state) => state.value.value;
export default userSlice.reducer;