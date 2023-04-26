import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./dashboardState";
import { DashboardReq } from "../types";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<DashboardReq>) {
            state.searchParams = action.payload;
        },
    },
});

export const { setSearchParams } = dashboardSlice.actions;

export default dashboardSlice.reducer;
