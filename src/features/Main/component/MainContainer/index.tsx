import { destroyCookie } from "nookies";
import MainContent from "../MainContent";

const MainContainer = () => {
    const logout = () => {
        destroyCookie(null, "jwt", { path: "/" });
    };

    return <MainContent />;
};

export default MainContainer;
