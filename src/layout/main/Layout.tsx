"use client";

interface MenuItem {
    label: string;
    desc: string;
    url: string;
}

interface LayoutProps {
    children: React.ReactNode;
}

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../header/Header";
import { useAppSelector } from "@/redux/hooks";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();

    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const menuItems: MenuItem[] = userInfoDetail?.menu.map((item) => ({
        label: item.menu_name,
        desc: item.menu_desc,
        url: item.menu_location.replace("/service", ""),
    }));

    const currentUrl = router.pathname;
    const currentItem = menuItems?.find((item) => item.url === currentUrl);

    // `Header` 컴포넌트의 렌더링 여부를 결정하는 변수
    const shouldRenderHeader =
        router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/findUserId" &&
        router.pathname !== "/lostPassword";

    return (
        <>
            {shouldRenderHeader && <Header />}
            <div className="max-w-[2520px] pt-36 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center min-h-screen">
                {currentItem && (
                    <div className="text-center ">
                        <h2 className="text-2xl font-medium">
                            {currentItem ? currentItem.label : ""}
                        </h2>
                        <hr className=" w-[20px] mx-auto my-2 border-[#000]" />
                        <div className=" text-[#909090] font-light">
                            {currentItem ? currentItem.desc : ""}
                        </div>
                    </div>
                )}
                {children}
            </div>
        </>
    );
};

export default Layout;
