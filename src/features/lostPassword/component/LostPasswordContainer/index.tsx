import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
// import { setSession } from "@/features/login/redux/loginSlice";
import Link from "next/link";

const LostPasswordContainer = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // 구글 로그인방식
    // const { data: session, status } = useSession();

    const handleSignIn = () => {
        signIn("google");
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    // if (status === "loading" || session) {
    //     return null; // 로딩 중이거나 이미 로그인 된 경우, 렌더링하지 않음
    // }

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
                        비밀번호 재발급
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label
                                htmlFor="id"
                                className="block mt-[10px] text-gray-700"
                            >
                                사용자 ID
                            </label>
                            <div className="mt-1">
                                <input
                                    id="id"
                                    name="id"
                                    type="id"
                                    autoComplete="id"
                                    required
                                    placeholder="사용자ID를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block  text-gray-700"
                            >
                                비밀번호
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="비밀번호를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <button className="w-full py-2 px-4 border border-transparent rounded-md text-xl text-white bg-[#0C9BE7] hover:bg-[#007cbe] transition delay-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C9BE7]">
                            확인
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
                                입력된 메일로 비밀번호 변경가능한 링크가
                                전달됩니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LostPasswordContainer;
