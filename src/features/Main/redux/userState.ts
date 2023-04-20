import { SerializedError } from "@reduxjs/toolkit";

export const initialState = {
    userProfile: <any>[],
    fetchUserProfileErrors: <SerializedError>[],
    fetchUserProfileLoading: false,
};
