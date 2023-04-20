import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Container from "../Container";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import UserMenu from "./UserMenu";
import { parseCookies } from "nookies";
import { getUserInfoDetail } from "@/features/login/redux/loginAction";

const Header = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    useEffect(() => {
        if (token?.jwt && !userInfoDetail) {
            dispatch(
                getUserInfoDetail({
                    params: {
                        jwt: token?.jwt,
                    },
                })
            );
        }
    }, [token?.jwt, userInfoDetail]);

    return (
        <>
            <header className="fixed left-0 top-0 min-w-full !z-50">
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
                            <Navbar menu={userInfoDetail?.menu} />
                        </div>
                        <UserMenu userInfo={userInfoDetail} />
                    </Container>
                </div>
                <Pagination />
            </header>
        </>
    );
};
export default Header;
