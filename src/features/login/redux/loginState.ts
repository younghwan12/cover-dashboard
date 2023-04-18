import { SerializedError } from "@reduxjs/toolkit";

export const initialState = {
    userInfo: <any>[],
    fetchUserInfoErrors: <SerializedError>[],
    fetchUserInfoLoading: false,

    userInfoDetail: <any>[],
    fetchUserInfoDetailErrors: <SerializedError>[],
    fetchUserInfoDetailLoading: false,
};
