import { createAsyncThunk } from "@reduxjs/toolkit";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import LoginApi from "@/features/login/api";
import { UserInfo, UserInfoDetail } from "../types";
import { destroyCookie } from "nookies";

// 로그인
export const getUserInfo = createAsyncThunk<
    UserInfo,
    {
        params: Params;
    }
>("user/getUserInfo", async (data) => {
    try {
        const response = await LoginApi.getUserInfo(data.params);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const getUserInfoDetail = createAsyncThunk<
    UserInfoDetail,
    {
        params: Params;
    }
>("user/getUserInfoDetail", async (data) => {
    try {
        const response = await LoginApi.getUserInfoDetail(data.params);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

// 로그아웃
export const logoutUser = createAsyncThunk<void, { params: Params }>(
    "user/logout",
    async (data) => {
        try {
            // 쿠키 삭제
            destroyCookie(null, "jwt", {
                path: "/",
            });
        } catch (err) {
            return console.log(err);
        }
    }
);
