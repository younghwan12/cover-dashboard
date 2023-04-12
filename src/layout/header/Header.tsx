import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Container from "../Container";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import UserMenu from "./UserMenu";
import { RootState } from "@/redux/store";

const Header = () => {
    return (
        <>
            <div className="fixed left-0 top-0 min-w-full !z-50">
                <div className="py-4 border-t-[4px] border-[#0072bb] bg-white">
                    <Container>
                        <div
                            className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    md:gap-0
                "
                        >
                            <Logo />
                            <Navbar />
                        </div>
                        <UserMenu />
                    </Container>
                </div>
                <Pagination />
            </div>
        </>
    );
};
export default Header;
