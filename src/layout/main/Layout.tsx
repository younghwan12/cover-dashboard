"use client";

interface MenuItem {
    label: string;
    desc: string;
    url: string;
    depth: number;
}

interface LayoutProps {
    children: React.ReactNode;
}

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../header/Header";
import { useAppSelector } from "@/redux/hooks";
import Footer from "../footer/Footer";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();

    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const menuItems: MenuItem[] = userInfoDetail?.menu?.map((item) => ({
        label: item.menu_name,
        desc: item.menu_desc,
        url: item.menu_location.replace("/service", ""),
        depth: item.menu_depth,
    }));

    const currentUrl = router.pathname;
    const currentItem = menuItems?.filter((item) => item.url === currentUrl);

    let selectedMenuItem: MenuItem | undefined;
    if (currentItem && currentItem.length > 0) {
        selectedMenuItem =
            currentItem.find((item) => item.depth === 2) ?? currentItem[0];
    }

    // `Header` 컴포넌트의 렌더링 여부를 결정하는 변수
    // const shouldRenderHeader =
    //     router.pathname !== "/login" &&
    //     router.pathname !== "/register" &&
    //     router.pathname !== "/findUserId" &&
    //     router.pathname !== "/lostPassword";

    return (
        <>
            <Header />
            {/* min-h-screen */}
            <div className="max-w-[2520px] min-h-screen pt-36 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center">
                {currentItem && (
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-medium">
                            {selectedMenuItem ? selectedMenuItem.label : ""}
                        </h2>
                        <hr className=" w-[20px] mx-auto my-2 border-[#000]" />
                        <div className=" text-[#909090] font-light">
                            {selectedMenuItem ? selectedMenuItem.desc : ""}
                        </div>
                    </div>
                )}
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
