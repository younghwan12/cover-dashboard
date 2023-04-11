"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Link
            className="flex items-center justify-center cursor-pointer"
            href="/"
        >
            <Image
                alt="logo"
                // className="hidden md:block"
                width="163"
                height="163"
                src="/images/logo.png"
            />
            <span className="hidden md:block ml-1 text-2xl font-semibold text-gray-700 cursor-pointer mr-10 top-[3px] relative">
                고객센터
            </span>
        </Link>
    );
};

export default Logo;
