import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
    const router = useRouter();
    return (
        <>
            <div className="px-2">
                <div className="flex flex-row items-center justify-between text-gray-700">
                    <div className="cursor-pointer text-lg font-semibold">
                        Dashboard
                    </div>
                    <div className="relative mx-7">
                        <button className="peer cursor-pointer text-lg font-semibold">
                            유지보수 및 기술지원
                        </button>
                        <div className="hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-48 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                            <a
                                className=" text-gray-400 py-2.5 hover:text-[#0072bb] font-medium text-sm"
                                href="#"
                            >
                                문의
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="peer cursor-pointer text-lg font-semibold">
                            <Link href="/sysMgt/code">시스템 관리</Link>
                        </div>
                        <div className=" hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-48 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                            <Link
                                className="text-gray-400 py-2.5 border-b-[1px] hover:text-[#0072bb] font-medium text-sm"
                                href="/sysMgt/code"
                            >
                                코드정보
                            </Link>
                            <Link
                                className="text-gray-400 py-2.5 border-b-[1px] hover:text-[#0072bb] font-medium text-sm"
                                href="/sysMgt/user"
                            >
                                사용자
                            </Link>
                            <a
                                className="text-gray-400 py-2.5 hover:text-[#0072bb] font-medium text-sm"
                                href="#"
                            >
                                프로젝트
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
