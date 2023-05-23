export const config = {
    local: {
        url: {
            API_BASE_URL: "http://localhost:3000",
            API_TEST_URL: "http://localhost:4000",
            API_BACK_URL: "http://coverdreamit.co.kr:8001",
            API_LICENSE_URL: "http://localhost:3000/api/coverdreamit",
        },
    },
}[process.env.ENV || "local"];
