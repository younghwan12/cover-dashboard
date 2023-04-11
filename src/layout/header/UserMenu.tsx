import { useModal } from "@/components/Modal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

import { Button, Modal, Space } from "antd";

const { confirm } = Modal;
const UserMenu = () => {
    const { data: session } = useSession();
    const [modal, contextHolder] = useModal();

    const handleLogout = () => {
        modal.confirm({
            className: "",
            title: "로그아웃 하시겠습니까?",
            onOk() {
                signOut();
            },
        });
    };

    if (session) {
        return (
            <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
                {contextHolder}
                <button
                    onClick={() => handleLogout()}
                    className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
                >
                    {session.user?.name} 님 로그아웃
                </button>
                <div className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200">
                    회원가입
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
                <Link
                    href="/login"
                    className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
                >
                    로그인
                </Link>
                <div className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200">
                    회원가입
                </div>
            </div>
        </>
    );
};

export default UserMenu;
