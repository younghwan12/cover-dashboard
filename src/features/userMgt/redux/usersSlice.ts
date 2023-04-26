import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./usersState";
import { UserListReq } from "../types";

export const userMgtSlice = createSlice({
    name: "userMgt",
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<UserListReq>) {
            state.searchParams = action.payload;
        },
    },
});

export const { setSearchParams } = userMgtSlice.actions;

export default userMgtSlice.reducer;
