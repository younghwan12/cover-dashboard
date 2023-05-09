import qs from "query-string";
import appApi from "@/redux/appApi";
import {
    SettingListResList,
    SettingListReq,
    SettingDetailResList,
    SettingMenuListRes,
    MenuListReq,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Setting", "SettingDetail", "SettingMenu"],
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
        getSettingMenuList: builder.query<SettingMenuListRes, MenuListReq>({
            query: (args) => ({
                url: `/setting/menuList?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "SettingMenu" }],
        }),
        upDateMenuList: builder.mutation<SettingListResList, MenuListReq>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/setting/menuSave`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "SettingMenu" }],
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
    overrideExisting: true,
});

export default settingMgtApi;
export const {
    useLazyGetSettingMgtListQuery,
    useLazyGetSettingMenuListQuery,
    useUpDateSettingMgtListMutation,
    useLazyGetSettingDetailListQuery,
    useUpDateMenuListMutation,
} = settingMgtApi;
