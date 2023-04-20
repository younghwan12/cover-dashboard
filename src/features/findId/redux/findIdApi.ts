import qs from "query-string";
import appApi from "@/redux/appApi";
import { FindEmailReq, FindEmailResList } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Email"],
});

const findEmailApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmailList: builder.query<FindEmailResList, FindEmailReq>({
            query: (args) => ({
                url: `/PortalCommon/putMailUserId?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "Email" }],
        }),
    }),
});

export default findEmailApi;
export const { useLazyGetEmailListQuery } = findEmailApi;
