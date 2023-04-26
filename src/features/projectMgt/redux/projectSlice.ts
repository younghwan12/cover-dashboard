import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./projectState";
import { ProjectListReq } from "../types";

export const projectMgtSlice = createSlice({
    name: "projectMgt",
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<ProjectListReq>) {
            state.searchParams = action.payload;
        },
    },
});

export const { setSearchParams } = projectMgtSlice.actions;

export default projectMgtSlice.reducer;
