"use client";

import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className="mt-10 bg-[#3b3b3b] min-w-full py-5 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex items-center text-[#a5a5a5] text-sm">
            <h3>
                <Image
                    alt="logo_fot"
                    width="161"
                    height="24"
                    src="/images/logo_fot.png"
                />
            </h3>
            <address className="not-italic ml-5">
                피엠에스플러스<em>|</em>
                <span className="inline-block mr-3 mb-2">대표이사: 윤성일</span>
                <span className="inline-block mr-3 mb-2">
                    Tel : 010-9332-1672
                </span>
                <span className="inline-block mr-3 mb-2">
                    E-Mail : rulyang@pmsplus.co.kr
                </span>
                <p>
                    Copyright (c) 2013 PMSPLUS., LTD. ALL RIGHTS RESERVED.
                    Powerd by PMSPLUS.
                </p>
            </address>
        </footer>
    );
};

export default Footer;
