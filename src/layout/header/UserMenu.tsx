import { useModal } from "@/components/Modal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button, Modal, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/features/login/redux/loginSlice";

const UserMenu = ({ userInfo }) => {
    const dispatch = useAppDispatch();
    // const { data: session } = useSession();
    const [modal, contextHolder] = useModal();

    const handleLogout = () => {
        modal.confirm({
            title: "로그아웃 하시겠습니까?",
            onOk() {
                dispatch(logout());
            },
        });
    };

    if (userInfo?.auth) {
        return (
            <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
                {contextHolder}
                <button
                    onClick={() => handleLogout()}
                    className="border-[1px] rounded px-[14px] py-[6px] mr-2 bg-gray-100 text-sm hover:bg-gray-200"
                >
                    {userInfo?.user_name} 님 로그아웃
                </button>
                <button className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200">
                    내정보
                </button>
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
                <Link
                    href="/register"
                    className="border-[1px] rounded px-[14px] py-[6px] bg-slate-50 text-sm hover:bg-gray-200"
                >
                    회원가입
                </Link>
            </div>
        </>
    );
};

export default UserMenu;
