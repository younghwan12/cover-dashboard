import UsersApi from "@/features/main/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { UserProfileResList } from "../types";

export const getUserProfile = createAsyncThunk<
    UserProfileResList,
    {
        params: Params;
    }
>("user/getUserProfile", async (data) => {
    try {
        const response = await UsersApi.getUserProfile(data.params);
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});
