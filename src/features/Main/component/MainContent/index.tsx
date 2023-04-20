import React from "react";
import Image from "next/image";

const VisitorContent = () => {
    return (
        <div className="text-center">
            <h2 className="text-4xl">환영합니다</h2>
            <hr className=" w-[130px] mx-auto my-5 border-[#e5e5e5]" />
            <div>
                <p>안녕하십니까.</p>
                <br />
                <p>피엠에스플러스 고객지원센터에 오신걸 환영합니다.</p>
                <p>
                    유지보수 및 기술지원 요청을 위해서는 회원가입을 먼저
                    해주시고
                </p>
                <p>우측 상단의 프로젝트 선택 후 문의 사항을 남겨주세요.</p>
                <br />
                <p>감사합니다.</p>
            </div>
            <div className="my-5">
                <ul className="flex justify-center">
                    <li className="p-2">
                        <Image
                            alt="home_st1"
                            width="184"
                            height="243"
                            src="/images/home_st1.png"
                        />
                    </li>
                    <li className="p-2">
                        <Image
                            alt="home_st2"
                            width="184"
                            height="243"
                            src="/images/home_st2.png"
                        />
                    </li>
                    <li className="p-2">
                        <Image
                            alt="home_st3"
                            width="184"
                            height="243"
                            src="/images/home_st3.png"
                        />
                    </li>
                    <li className="p-2">
                        <Image
                            alt="home_st4"
                            width="184"
                            height="243"
                            src="/images/home_st4.png"
                        />
                    </li>
                </ul>
            </div>
            <div>
                <ul className="flex justify-center items-center text-center">
                    <li className="text-[#363636] text-sm">
                        고객지원 담당자 연락처
                    </li>
                    <li className="flex justify-center items-center text-center text-[#0c9be7] px-3 py-4 text-sm">
                        <Image
                            alt="home_phone"
                            width="36"
                            height="36"
                            src="/images/home_phone.png"
                        />
                        <p className="ml-1">010-8785-7935</p>
                    </li>
                    <li className="flex justify-center items-center text-center text-[#0c9be7] px-3 py-4 text-sm">
                        <Image
                            alt="home_email"
                            width="36"
                            height="36"
                            src="/images/home_email.png"
                        />
                        <p className="ml-1">kihihi81@pmsplus.co.kr</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VisitorContent;
