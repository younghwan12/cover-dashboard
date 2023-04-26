import qs from "query-string";
import appApi from "@/redux/appApi";
import { UserListResList, UserListReq } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["userMgt"],
});

const userMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserMgtList: builder.query<UserListResList, UserListReq>({
            query: (args) => ({
                url: `/user/list?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "userMgt" }],
        }),
    }),
});

export default userMgtApi;
export const { useLazyGetUserMgtListQuery } = userMgtApi;
