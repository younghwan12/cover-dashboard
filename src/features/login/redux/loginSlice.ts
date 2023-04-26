import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo, getUserInfoDetail } from "./loginAction";
import { initialState } from "./loginState";
import { destroyCookie, setCookie } from "nookies";
import { persistor } from "@/redux/store";
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            // 로그아웃 로직
            destroyCookie(null, "jwt");
            return {
                ...state,
                userInfo: null,
                userInfoDetail: null,
            };
            // state.userInfo = null;
            // state.userInfoDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.fetchUserInfoLoading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            const jwt = action.payload.jwt;
            if (jwt) {
                setCookie(null, "jwt", jwt, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });
            }
            state.userInfo = action.payload;
            state.fetchUserInfoLoading = false;
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.fetchUserInfoErrors = action.error;
            state.fetchUserInfoLoading = false;
        });

        // 상세정보
        builder.addCase(getUserInfoDetail.pending, (state, action) => {
            state.fetchUserInfoDetailLoading = true;
        });
        builder.addCase(getUserInfoDetail.fulfilled, (state, action) => {
            state.userInfoDetail = action.payload;
            state.fetchUserInfoDetailLoading = false;
        });
        builder.addCase(getUserInfoDetail.rejected, (state, action) => {
            state.fetchUserInfoDetailErrors = action.error;
            state.fetchUserInfoDetailLoading = false;
        });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
