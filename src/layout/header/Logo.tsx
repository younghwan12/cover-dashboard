"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const Logo = () => {
    const router = useRouter();

    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
        >
            <Image
                alt="logo"
                className="hidden md:block"
                width="163"
                height="163"
                src="/images/logo.png"
            />
            <span className="hidden md:block ml-1 text-2xl font-bold text-gray-700 cursor-pointer mr-10">
                고객센터
            </span>
        </div>
    );
};

export default Logo;
