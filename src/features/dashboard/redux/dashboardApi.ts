import qs from "query-string";
import appApi from "@/redux/appApi";
import { DashboardReq, DashboardResList } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["Dashboard"],
});

const dashboardApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardList: builder.query<DashboardResList, DashboardReq>({
            query: (args) => ({
                url: `/dashboard/list?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "Dashboard" }],
        }),
    }),
});

export default dashboardApi;
export const { useLazyGetDashboardListQuery } = dashboardApi;
