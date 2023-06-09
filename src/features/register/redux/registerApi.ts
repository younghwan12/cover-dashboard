import qs from "query-string";
import appApi from "@/redux/appApi";
import { RegiIDCheckReq, RegisterReq, RegisterRes } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["Register"],
});

const registerApi = appTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    checkDupId: builder.query<RegisterRes, RegiIDCheckReq>({
      query: (args) => ({
        url: `/user/checkDupId?${qs.stringify(args)}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Register" }],
    }),
    registerID: builder.mutation<any, RegisterReq>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/user/insert`,
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: encodedFormData,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export default registerApi;
export const { useLazyCheckDupIdQuery, useRegisterIDMutation } = registerApi;
