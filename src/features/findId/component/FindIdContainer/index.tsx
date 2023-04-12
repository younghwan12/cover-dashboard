import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
// import { setSession } from "@/features/login/redux/loginSlice";
import Link from "next/link";

const FindIdContainer = () => {
    return (
        <div className="min-h-screen flex flex-col py-12 sm:px-6 lg:px-8">
            {/* <div className="sm:mx-auto sm:w-full sm:max-w-md"> */}
            <h2 className="text-center text-3xl text-[#555555] mt-[80px]">
                <Link href="/">피엠에스플러스 고객센터</Link>
            </h2>
            {/* </div> */}

            <div className="xl:min-w-[500px] mt-8 sm:mx-auto sm:w-full sm:max-w-md border-t-[6px] border-[#0C9BE7] drop-shadow-xl">
                <div className="bg-[#F7F7F7] py-8 px-4 shadow sm:px-10">
                    <div className="pb-4 mb-2 text-2xl text-gray-700 border-b-[1px] border-[#dcdcdc]">
                        ID 찾기
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mt-[10px] text-gray-700"
                            >
                                메일
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="메일 주소를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <button className="w-full py-2 px-4 rounded-md text-xl text-white bg-[#0C9BE7] hover:bg-[#007cbe] transition delay-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C9BE7]">
                            로그인
                        </button>
                        <div className="flex justify-between items-center">
                            <Link
                                href="/login"
                                className="ml-auto bg-[#767676] text-sm text-[#fff] px-2 py-1 rounded hover:bg-[#5c5c5c] m "
                            >
                                취소
                            </Link>
                        </div>
                        <hr />
                        <ul>
                            <li className="py-[5px] text-[14px]">
                                <span className="text-[red] mr-1">*</span>
                                입력된 메일로 ID가 전달됩니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FindIdContainer;