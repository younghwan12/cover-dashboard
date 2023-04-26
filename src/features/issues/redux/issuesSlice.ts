import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./issuesState";
import { IssuesListReq } from "../types";

export const issuesMgtSlice = createSlice({
    name: "issuesMgt",
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<IssuesListReq>) {
            state.searchParams = action.payload;
        },
    },
});

export const { setSearchParams } = issuesMgtSlice.actions;

export default issuesMgtSlice.reducer;
