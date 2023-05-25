import qs from "query-string";
import appApi from "@/redux/appApi";
import {
  IssuesListResList,
  IssuesListReq,
  UpdateIssuesListRes,
  UpdateIssuesListReq,
  IssuesDetailResList,
  UpdateFilesRes,
  UpdateFilesReq,
  IssueHistoryRes,
  AddIssuesQARes,
  AddIssuesQAReq,
} from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["IssuesMgt", "IssuesDetail", "IssuesHistory"],
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
    upDateFileList: builder.mutation<UpdateFilesRes, UpdateFilesReq>({
      query: (formData) => {
        return {
          url: `/file/upload`,
          method: "POST",
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
          data: formData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesMgt" }],
    }),
    delFileList: builder.mutation<UpdateFilesRes, UpdateFilesReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/issues/fileDelete`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesDetail" }],
    }),
    upDateIssuesMgtList: builder.mutation<UpdateIssuesListRes, UpdateIssuesListReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/issues/insert`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesMgt" }],
    }),
    modifyIssuesMgtList: builder.mutation<UpdateIssuesListRes, UpdateIssuesListReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/issues/update`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesMgt" }],
    }),
    getIssuesDetail: builder.query<IssuesDetailResList, IssuesListReq>({
      query: (args) => ({
        url: `/issues/getIssueInfoDetail?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "IssuesDetail" }],
    }),
    addIssuesQA: builder.mutation<AddIssuesQARes, AddIssuesQAReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/issues/insertIssueQA`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesDetail" }],
    }),
    upDateIssuesQA: builder.mutation<AddIssuesQARes, AddIssuesQAReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/issues/updateIssueQA`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "IssuesDetail" }],
    }),
    getIssuesHistory: builder.query<IssueHistoryRes, IssuesListReq>({
      query: (args) => ({
        url: `/issues/getIssueInfoHistory?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "IssuesHistory" }],
    }),
  }),
  overrideExisting: true,
});

export default issuesMgtApi;
export const {
  useLazyGetIssuesMgtListQuery,
  useUpDateIssuesMgtListMutation,
  useUpDateFileListMutation,
  useLazyGetIssuesDetailQuery,
  useModifyIssuesMgtListMutation,
  useDelFileListMutation,
  useLazyGetIssuesHistoryQuery,
  useAddIssuesQAMutation,
  useUpDateIssuesQAMutation,
} = issuesMgtApi;
