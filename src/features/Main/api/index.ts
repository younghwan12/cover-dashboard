import AxiosInstance from "@/api/http-common";
import queryString from "query-string";
const UsersApi = {
    getUserProfile,
};

function getUserProfile(params) {
    const query = queryString.stringify(params, { arrayFormat: "bracket" });
    return AxiosInstance.get(`/PortalCommon/getMyInfo?${query}`, {
        // headers: {
        //     Authorization: bearerAuth(token),
        // },
    });
}
function bearerAuth(token: string | undefined) {
    return `Bearer ${token}`;
}

export default UsersApi;
