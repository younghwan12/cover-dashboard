import qs from "query-string";
import appApi from "@/redux/appApi";
import { FindPwReq, FindPwResList } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Password"],
});

const findPasswordApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getPwList: builder.query<FindPwResList, FindPwReq>({
            query: (args) => ({
                url: `/PortalCommon/putMailChangePwUrl?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "Password" }],
        }),
    }),
});

export default findPasswordApi;
export const { useLazyGetPwListQuery } = findPasswordApi;
