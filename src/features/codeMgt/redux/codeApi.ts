import qs from "query-string";
import appApi from "@/redux/appApi";
import {
    CodeMgtReq,
    CodeMgtResList,
    AddCodeMgtReq,
    DelCodeMgtReq,
    DelCode,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["CodeMgt"],
});

const codeMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getCodeList: builder.query<CodeMgtResList, CodeMgtReq>({
            query: (args) => ({
                url: `/code/list?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "CodeMgt" }],
        }),
        addCodeList: builder.mutation<CodeMgtResList, AddCodeMgtReq>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/code/insert`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "CodeMgt" }],
        }),
        upDateCodeList: builder.mutation<CodeMgtResList, AddCodeMgtReq>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/code/update`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "CodeMgt" }],
        }),
        delCode: builder.mutation<CodeMgtResList, DelCode>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/code/delete`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "CodeMgt" }],
        }),
        // 다중삭제
        delCodeList: builder.mutation<CodeMgtResList, DelCodeMgtReq>({
            query: (formData) => {
                const encodedFormData = `${qs.stringify(formData)}`;
                return {
                    url: `/code/rowDelete`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: encodedFormData,
                };
            },
            invalidatesTags: () => [{ type: "CodeMgt" }],
        }),
    }),
    overrideExisting: true,
});

export default codeMgtApi;
export const {
    useLazyGetCodeListQuery,
    useAddCodeListMutation,
    useDelCodeMutation,
    useUpDateCodeListMutation,
    useDelCodeListMutation,
} = codeMgtApi;
