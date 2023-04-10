export const config = {
    local: {
        url: {
            API_BASE_URL: "http://localhost:3000",
            API_TEST_URL: "http://localhost:4000",
            API_BACK_URL: "http://192.168.0.8:4000",
        },
    },
}[process.env.ENV || "local"];
