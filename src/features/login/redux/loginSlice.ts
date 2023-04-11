import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "../types";

type AuthState = {
    session: Session | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    session: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            return { ...state, session: action.payload };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setSession, setLoading, setError } = authSlice.actions;
export default authSlice;
