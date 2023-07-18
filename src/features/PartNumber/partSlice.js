import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
    name: 'part',
    initialState: {
        value: null,
    },
    reducers: {
        setPart: (state,action) => {
            state.value = action.payload;
        },
        removePart: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const{setPart , removePart} = partSlice.actions;
export const selectPart = (state) => state.value;
export default partSlice.reducer;