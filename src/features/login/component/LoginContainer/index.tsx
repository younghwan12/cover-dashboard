import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
// import { setSession } from "@/features/login/redux/loginSlice";
import Link from "next/link";

const LoginContainer = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // 구글 로그인방식
    const { data: session, status } = useSession();

    const handleSignIn = () => {
        signIn("google");
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading" || session) {
        return null; // 로딩 중이거나 이미 로그인 된 경우, 렌더링하지 않음
    }

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
                        로그인
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
                            로그인
                        </button>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    ID 저장
                                </label>
                            </div>
                            <div>
                                <Link
                                    href="/findUserId"
                                    className="bg-[#767676] text-sm text-[#fff] px-2 py-1 rounded mr-1 hover:bg-[#5c5c5c]"
                                >
                                    ID 찾기
                                </Link>
                                <Link
                                    href="/lostPassword"
                                    className="bg-[#767676] text-sm text-[#fff] px-2 py-1 rounded mr-1 hover:bg-[#5c5c5c]"
                                >
                                    비밀번호 재발급
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-[#767676] text-sm text-[#fff] px-2 py-1 rounded hover:bg-[#5c5c5c]"
                                >
                                    회원가입
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <Button
                            outline
                            label="구글로 로그인하기"
                            icon={FcGoogle}
                            onClick={handleSignIn}
                        />
                        <hr />
                        <ul>
                            <li className="py-[5px] text-[14px]">
                                <span className="text-[red] mr-1">*</span>
                                비회원 분들은 문의하기 메뉴 이용을 하실 수
                                없습니다.
                            </li>
                            <li className=" py-[5px] text-[14px]">
                                <span className="text-[red] mr-1">*</span>
                                비밀번호입력 오류 5회 이상 시 계정이
                                비활성화됩니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginContainer;
