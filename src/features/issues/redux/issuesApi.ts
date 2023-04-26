import qs from "query-string";
import appApi from "@/redux/appApi";
import { IssuesListResList, IssuesListReq } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["IssuesMgt"],
});

const issuesMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getIssuesMgtList: builder.query<IssuesListResList, IssuesListReq>({
            query: (args) => ({
                url: `/issues/list?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "IssuesMgt" }],
        }),
    }),
});

export default issuesMgtApi;
export const { useLazyGetIssuesMgtListQuery } = issuesMgtApi;
