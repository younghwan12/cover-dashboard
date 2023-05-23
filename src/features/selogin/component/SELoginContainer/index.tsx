import Button from "@/components/Button";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
// import { setSession } from "@/features/login/redux/loginSlice";
import axios from "axios";
import Link from "next/link";

import { useModal } from "@/components/Modal";
import { parseCookies } from "nookies";

const LoginContainer = () => {
    const [modal, contextHolder] = useModal();
    const dispatch = useAppDispatch();
    const router = useRouter();
    // 아이디와 패스워드 값을 상태로 관리
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [idSave, setIdSave] = useState(false);

    // id저장 쿠키 확인
    const cookies = parseCookies();
    const storedUserId = cookies.userId;

    useEffect(() => {
        if (storedUserId) {
            setUserId(storedUserId);
            setIdSave(true);
        }
    }, []);

    const idSaveCheck = (e) => {
        setIdSave(e.target.checked);
    };

    const handleKeyPress = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            // 엔터키를 눌렀을 때
            await handleFinish(); // handleFinish 함수 실행
        }
    };

    const handleFinish = async () => {
        // PLMIMS 로그인
        const url = "/api/coverdreamit/web/common/BCLogin/pmLogin.xmd";
        const xmlData = `<?xml version="1.0" encoding="UTF-8"?><request><transaction><id>common/BCLogin/pmLogin</id></transaction><attributes><userId/></attributes><dataSet><fields><urlStr>http://coverdreamit.co.kr:2401/web/login/cdi/login.jsp</urlStr><J_USERNAME>${userId}</J_USERNAME><J_PASSWORD>${password}</J_PASSWORD><J_LANGUAGE>ko_KR</J_LANGUAGE></fields></dataSet><validation><result>true</result><errors/></validation></request>`;

        axios
            .post(url, xmlData, {
                headers: {
                    "Content-Type": "text/xml",
                },
            })
            .then((response) => {
                if (response.data.fieldCount) {
                    router.push("/license");
                } else {
                    modal.error({
                        title: "아이디 또는 비밀번호가 틀렸습니다.",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // PLMIMS 로그인

        // try {
        //     if (idSave) {
        //         setCookie(null, "userId", userId, {
        //             maxAge: 30 * 24 * 60 * 60, // 30일간 유지
        //             path: "/", // 전체 도메인에서 사용 가능하도록 설정
        //         });
        //     } else {
        //         destroyCookie(null, "userId", {
        //             path: "/",
        //         });
        //     }

        //     const loginCheck = await dispatch(
        //         getUserInfo({
        //             params: {
        //                 user_id: userId,
        //                 pwd: password,
        //             },
        //         })
        //     );
        //     const payload: any = loginCheck.payload;

        //     if (payload.type === "accountErr") {
        //         modal.error({
        //             title: "잘못된 계정 또는 비밀번호입니다.",
        //             content: "입력 오류 5회 이상 시 계정이 비활성화됩니다.",
        //         });
        //     } else if (payload.type === "notAuthError") {
        //         modal.error({
        //             title: "권한이 지정되지 않았습니다.",
        //             content:
        //                 "고객지원센터 관리자(nexcore4u@sk.com, 02-6400-6123)에게 문의하세요.",
        //         });
        //     } else if (payload.type === "activeNError") {
        //         modal.error({
        //             title: "계정이 비활성화 상태입니다.",
        //             content:
        //                 "고객지원센터 관리자(nexcore4u@sk.com, 02-6400-6123)에게 문의하세요.",
        //         });
        //     } else if (payload.type === "activeNPwError") {
        //         modal.error({
        //             title: "비밀번호 5회이상 입력오류로 계정이 비활성화 상태입니다.",
        //             content:
        //                 "비밀번호 재발급 또는 고객지원센터 관리자(nexcore4u@sk.com, 02-6400-6123)에게 문의하세요.",
        //         });
        //     } else if (payload.type === "activeWaitError") {
        //         modal.error({
        //             title: "계정이 대기 상태입니다.",
        //             content:
        //                 "고객지원센터 관리자(nexcore4u@sk.com, 02-6400-6123)에게 문의하세요.",
        //         });
        //     } else if (payload.type === "success") {
        //         router.push("/dashboard");
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };
    // 구글 로그인방식
    // const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         router.push("/");
    //     }
    // }, [status, router]);

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
            {contextHolder}
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
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
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
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyDown={handleKeyPress}
                                    // onKeyPress={handleKeyPress}
                                    autoComplete="current-password"
                                    required
                                    placeholder="비밀번호를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <button
                            // onClick={handleSignInPP}
                            onClick={handleFinish}
                            className="w-full py-2 px-4 border border-transparent rounded-md text-xl text-white bg-[#0C9BE7] hover:bg-[#007cbe] transition delay-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C9BE7]"
                        >
                            로그인
                        </button>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    checked={idSave}
                                    onChange={idSaveCheck}
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
                            onClick={() => signIn("google")}
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
