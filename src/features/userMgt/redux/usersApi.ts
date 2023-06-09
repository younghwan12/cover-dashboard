import qs from "query-string";
import appApi from "@/redux/appApi";
import { UserListResList, UserListReq, UserDetailResList, UserDetailReqList, UserDelReq, DelUser } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["userMgt", "userDetailMgt"],
});

const userMgtApi = appTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMgtList: builder.query<UserListResList, UserListReq>({
      query: (args) => ({
        url: `/user/list?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "userMgt" }],
    }),
    delUser: builder.mutation<any, DelUser>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/user/delete`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "userMgt" }],
    }),
    // 다중삭제
    delUserMgtList: builder.mutation<any, UserDelReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/user/rowDelete`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "userMgt" }],
    }),
    upDateUserMgtList: builder.mutation<UserListResList, UserListReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/user/update`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      invalidatesTags: () => [{ type: "userMgt" }],
    }),
    getUserMgtDetail: builder.query<UserDetailResList, UserDetailReqList>({
      query: (args) => ({
        url: `/user/getUserInfoDetail?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "userDetailMgt" }],
    }),
  }),
});

export default userMgtApi;
export const {
  useLazyGetUserMgtListQuery,
  useUpDateUserMgtListMutation,
  useLazyGetUserMgtDetailQuery,
  useDelUserMutation,
  useDelUserMgtListMutation,
} = userMgtApi;
