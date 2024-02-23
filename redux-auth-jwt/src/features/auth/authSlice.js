// import createSlice, createAsyncThunk from reduxjs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create initial state with user and token
const initialState = {
    user: null,
    token: null,
};

// create slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // get the user and accessToken from action.payload
            // action.payload will be the data inserted to setCredentials
            const { user, accessToken } = action.payload;

            // set the user
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            (state.user = null), (state.token = null);
        },
    },
    extraReducers: (builder) => {},
});

// export actions and slice
export const {} = authSlice.actions;
export default authSlice.reducer;
