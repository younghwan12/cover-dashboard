import qs from "query-string";
import appApi from "@/redux/appApi";
import { UserProfileResList, UserProfileReq } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Profile"],
});

const profileApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileList: builder.query<UserProfileResList, UserProfileReq>({
            query: (args) => ({
                url: `/PortalCommon/getMyInfo?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "Profile" }],
        }),
    }),
});

export default profileApi;
export const { useLazyGetProfileListQuery } = profileApi;
