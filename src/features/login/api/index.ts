import AxiosInstance from "@/api/http-common";
import queryString from "query-string";
const LoginApi = {
    getUserInfo,
    getUserInfoDetail,
};

function getUserInfo(params) {
    const query = queryString.stringify(params, { arrayFormat: "bracket" });
    return AxiosInstance.get(`/PortalCommon/login?${query}`, {
        // headers: {
        //     Authorization: bearerAuth(token),
        // },
    });
}

// 사용자 상세정보
function getUserInfoDetail(params) {
    const query = queryString.stringify(params, { arrayFormat: "bracket" });
    return AxiosInstance.get(`/PortalCommon/session?${query}`, {
        // headers: {
        //     Authorization: bearerAuth(token),
        // },
    });
}

function bearerAuth(token: string | undefined) {
    return `Bearer ${token}`;
}

export default LoginApi;
