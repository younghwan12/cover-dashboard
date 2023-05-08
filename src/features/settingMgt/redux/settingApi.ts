import qs from "query-string";
import appApi from "@/redux/appApi";
import {
    SettingListResList,
    SettingListReq,
    SettingDetailResList,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Setting", "SettingDetail"],
});

const settingMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getSettingMgtList: builder.query<SettingListResList, SettingListReq>({
            query: (args) => ({
                url: `/setting/requestTypeList?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "Setting" }],
        }),
        upDateSettingMgtList: builder.mutation<
            SettingListResList,
            SettingListReq
        >({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/setting/requestTypeSave`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "Setting" }],
        }),
        getSettingDetailList: builder.query<
            SettingDetailResList,
            SettingListReq
        >({
            query: (args) => ({
                url: `/setting/requestTypeDetail?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "SettingDetail" }],
        }),
    }),
});

export default settingMgtApi;
export const {
    useLazyGetSettingMgtListQuery,
    useUpDateSettingMgtListMutation,
    useLazyGetSettingDetailListQuery,
} = settingMgtApi;
