import Link from "next/link";
import React from "react";

const UserMenu = () => {
    return (
        <>
            <div className="absolute right-6 -top-0.5 flex justify-between cursor-pointer ">
                <Link
                    href="/login"
                    className="border-[1px] rounded p-1.5 mr-2 bg-gray-100 text-sm hover:bg-gray-200"
                >
                    로그인
                </Link>
                <div className="border-[1px] rounded p-1.5 bg-slate-50 text-sm hover:bg-gray-200">
                    회원가입
                </div>
            </div>
        </>
    );
};

export default UserMenu;
