import qs from "query-string";
import appApi from "@/redux/appApi";
import { CodeMgtReq, CodeMgtResList } from "../types";

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
    }),
});

export default codeMgtApi;
export const { useLazyGetCodeListQuery } = codeMgtApi;
