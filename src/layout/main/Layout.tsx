"use client";

interface LayoutProps {
    children: React.ReactNode;
}

import { useRouter } from "next/router";
import React from "react";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const items = [
        { label: "시스템 관리", url: "/sysMgt" },
        { label: "코드정보", url: "/sysMgt/code", desc: "코드정보 설명" },
        { label: "사용자", url: "/sysMgt/user", desc: "사용자 설명" },
        { label: "프로젝트", url: "/sysMgt/project", desc: "프로젝트 설명" },
        { label: "설정", url: "/sysMgt/suljung", desc: "설정하는 화면입니다" },
    ];
    const currentUrl = router.pathname;
    const currentItem = items.find((item) => item.url === currentUrl);

    return (
        <div className="max-w-[2520px] pt-36 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center min-h-screen">
            <div className="text-center ">
                <h2 className="text-2xl font-medium">
                    {currentItem ? currentItem.label : ""}
                </h2>
                <hr className=" w-[20px] mx-auto my-2 border-[#000]" />
                <div className=" text-[#909090] font-light">
                    {currentItem ? currentItem.desc : ""}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;
