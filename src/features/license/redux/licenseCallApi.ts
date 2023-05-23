import qs from "query-string";
import licenseApi from "@/redux/licenseApi";
import xml2js from "xml2js";
import { parseStringPromise } from "xml2js";
import { LicenseReqList, LicenseResList } from "../types";

interface LicenseReq {
  userId: string;
}

interface LicenseRes {
  license: {
    licenseNo: string;
    licenseKind: string;
    licenseDt: string;
    expiryDt: string;
    productId: string;
    productName: string;
    serviceId: string;
    serviceName: string;
    status: string;
    memo: string;
  }[];
}

const licenseTaggedApi = licenseApi.enhanceEndpoints({
  addTagTypes: ["License"],
});

const LicenseCallApi = licenseTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    // getLicense: builder.query<LicenseRes, LicenseReq>({
    //     query: (userId) => {
    //         return {
    //             url: "/web/common/BCLicenseManager2/pmLicenseHistoryListInq_for_ip.xmd",
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/xml, text/xml, */*; q=0.01",
    //                 "Content-Type": "text/xml; charset=UTF-8",
    //                 "X-Requested-With": "XMLHttpRequest",
    //             },
    //             body: `<?xml version="1.0" encoding="UTF-8"?><request><transaction><id>common.BCLicenseManager2#pmLicenseHistoryListInq_for_ip</id></transaction><attributes><userId>0000000005</userId></attributes><dataSet><fields><urlStr>http://coverdreamit.co.kr:2401/web/jsp/cm/SLicenseManagerRetrieve2.jsp</urlStr><uid>0000000005</uid></fields></dataSet><validation><result>true</result><errors/></validation></request>`,
    //         };
    //     },
    //     transformResponse: async (response) => {
    //         const json = await parseStringPromise(response, {
    //             explicitArray: false,
    //         });
    //         console.log(json);
    //         return {
    //             license: json.response.dataSet.recordSet.record,
    //         };
    //     },
    //     providesTags: ["License"],
    // }),
    issueLicense: builder.query<LicenseResList, LicenseReqList>({
      query: (formData) => {
        const encodedFormData = `${qs.stringify(formData)}`;
        return {
          url: `/web/common/BCLicenseManager2/pmImportLicense.xmd`,
          method: "POST",
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodedFormData,
        };
      },
      providesTags: () => [{ type: "License" }],
    }),
  }),
});

export default LicenseCallApi;
export const { useLazyIssueLicenseQuery } = LicenseCallApi;
