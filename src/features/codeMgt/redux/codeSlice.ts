import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./codeState";
import { CodeMgtReq } from "../types";

export const codeMgtSlice = createSlice({
    name: "Code",
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<CodeMgtReq>) {
            state.searchParams = action.payload;
        },
    },
});

export const { setSearchParams } = codeMgtSlice.actions;

export default codeMgtSlice.reducer;
