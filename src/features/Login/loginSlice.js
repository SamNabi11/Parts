import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  status: 'logedOut',
};


export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    signOut: (state) => {
      state.value = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    signIn: (state, action) => {
        console.log("inside loginslice and signin action    " );
        console.log(action.payload);
      state.value = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { signIn, signOut } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.auth.value;



export default loginSlice.reducer;