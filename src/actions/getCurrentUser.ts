import axios from "axios";
import { parseCookies } from "nookies";

const getCurrentUser = async () => {
    try {
        // get JWT from cookies
        const cookies = parseCookies();
        const token = cookies.jwt;

        // if JWT exists, make request to get current user
        if (token) {
            const response = await axios.get("/api/currentUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // return user data
            return response.data;
        } else {
            // if JWT doesn't exist, return null
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getCurrentUser;
