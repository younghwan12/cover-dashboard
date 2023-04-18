import React from "react";
import { destroyCookie } from "nookies";

const MainContainer = () => {
    const logout = () => {
        destroyCookie(null, "jwt", { path: "/" });
    };

    return (
        <div className="text-rose-700 xl:px-20 md:px-10 sm:px-2 px-4">
            <div>HEEEEEEEEEEELLLO WORLD</div>
        </div>
    );
};

export default MainContainer;
