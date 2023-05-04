import qs from "query-string";
import appApi from "@/redux/appApi";
import {
    UserListResList,
    UserListReq,
    UserDetailResList,
    UserDetailReqList,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["userMgt", "userDetailMgt"],
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
        upDateUserMgtList: builder.mutation<UserListResList, UserListReq>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/user/update`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "userMgt" }],
        }),
        getUserMgtDetail: builder.query<UserDetailResList, UserDetailReqList>({
            query: (args) => ({
                url: `/user/getUserInfoDetail?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "userDetailMgt" }],
        }),
    }),
});

export default userMgtApi;
export const {
    useLazyGetUserMgtListQuery,
    useUpDateUserMgtListMutation,
    useLazyGetUserMgtDetailQuery,
} = userMgtApi;
