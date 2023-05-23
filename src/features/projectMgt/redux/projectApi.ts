import qs from "query-string";
import appApi from "@/redux/appApi";
import {
  ProjectListResList,
  ProjectListReq,
  ProjectAddReq,
  PrjDetailReq,
  PrjDetailRes,
  ProjectDelReq,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["ProjectMgt", "ProjectInfo"],
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
    getProjectDetail: builder.query<PrjDetailRes, PrjDetailReq>({
      query: (args) => ({
        url: `/project/getProjectInfoDetail?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "ProjectInfo" }],
    }),
    addProjectMgtList: builder.mutation<ProjectListResList, ProjectAddReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/project/insert`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "ProjectMgt" }],
    }),
    upDateProjectMgtList: builder.mutation<ProjectListResList, ProjectAddReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/project/update`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "ProjectMgt" }],
    }),
    delProjectMgtList: builder.mutation<any, ProjectDelReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/project/rowDelete`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "ProjectMgt" }],
    }),
  }),
  overrideExisting: true,
});

export default projectMgtApi;
export const {
  useLazyGetProjectMgtListQuery,
  useAddProjectMgtListMutation,
  useLazyGetProjectDetailQuery,
  useUpDateProjectMgtListMutation,
  useDelProjectMgtListMutation,
} = projectMgtApi;
