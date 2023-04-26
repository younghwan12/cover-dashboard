import qs from "query-string";
import appApi from "@/redux/appApi";
import { ProjectListResList, ProjectListReq } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["ProjectMgt"],
});

const projectMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectMgtList: builder.query<ProjectListResList, ProjectListReq>({
            query: (args) => ({
                url: `/project/list?${qs.stringify(args)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "ProjectMgt" }],
        }),
    }),
});

export default projectMgtApi;
export const { useLazyGetProjectMgtListQuery } = projectMgtApi;
