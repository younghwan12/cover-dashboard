import { useModal } from "@/components/Modal";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyGetPwListQuery } from "../../redux/findPw";

const LostPasswordContainer = () => {
    const [modal, contextHolder] = useModal();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [getPassword, { data: returnData, isError }] =
        useLazyGetPwListQuery();

    const findPassword = () => {
        if (userId.trim() === "") {
            modal.error({
                title: "사용자 ID를 입력해 주세요.",
            });
        } else if (email.trim() === "") {
            modal.error({
                title: "메일을 입력해 주세요.",
            });
        } else if (!emailRegex.test(email)) {
            modal.error({
                title: "메일 형식이 아닙니다. 메일을 확인해 주세요.",
            });
        } else {
            getPassword({
                user_id: userId,
                email: email,
            });
        }
    };

    useEffect(() => {
        // 데이터 송신 에러시
        if (isError) {
            modal.error({
                title: "에러입니다 관리자에게 문의하세요!!",
            });
        }
        if (returnData?.type === "accountErr") {
            modal.warning({
                title: "등록되지 않은 사용자 ID 또는 메일입니다.",
            });
        } else if (returnData?.type === "success") {
            modal.success({
                title: "입력된 이메일로 비밀번호 변경가능한 링크가 전달되었습니다.",
                onOk: () => router.push("/"),
            });
        }
    }, [returnData]);

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
                                    type="text"
                                    autoComplete="id"
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                    placeholder="사용자ID를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block  text-gray-700"
                            >
                                메일
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="메일 주소를 입력하세요."
                                    className="appearance-none block w-full p-[10px] border border-gray-300 rounded-md shadow-sm placeholder-[#6C757D] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={findPassword}
                            className="w-full py-2 px-4 border border-transparent rounded-md text-xl text-white bg-[#0C9BE7] hover:bg-[#007cbe] transition delay-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C9BE7]"
                        >
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
