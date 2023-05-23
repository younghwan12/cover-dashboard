import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@/config/config";

const baseQuery = fetchBaseQuery({
    baseUrl: `${config?.url.API_LICENSE_URL}`,
});

const licenseApi = createApi({
    reducerPath: "licenseApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});

export default licenseApi;
