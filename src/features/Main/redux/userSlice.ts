import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile } from "./userAction";
import { initialState } from "./userState";
import { destroyCookie, setCookie } from "nookies";

export const userSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state, action) => {
            state.fetchUserProfileLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
            state.fetchUserProfileLoading = false;
        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.fetchUserProfileErrors = action.error;
            state.fetchUserProfileLoading = false;
        });
    },
});

export default userSlice.reducer;
