import { getUserInfoDetail } from "@/features/login/redux/loginAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Container from "../Container";
import { UserMenu, Pagination, Navbar, Logo } from "@/layout/header";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import MoblieMenu from "./MoblieMenu";

const Header = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.login?.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login?.userInfoDetail);

  const [isMobile, setIsMobile] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1060);
      setIsPhone(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (token?.jwt) {
      dispatch(
        getUserInfoDetail({
          params: {
            jwt: token?.jwt,
          },
        })
      );
    }
  }, [token?.jwt]);

  return (
    <>
      <header className="fixed left-0 top-0 min-w-full !z-50">
        {isMobile ? (
          isPhone ? (
            <div className="py-4 border-t-[4px] border-[#0072bb] bg-blue-50">
              <Container>
                <div
                  className="
                      flex
                      justify-between
                  "
                >
                  <Logo />
                  <Navbar menu={userInfoDetail?.menu} userInfo={userInfoDetail} />
                </div>
              </Container>
            </div>
          ) : (
            <div className="py-4 border-t-[4px] border-[#0072bb] bg-blue-50 min-w-[715px]">
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
                  <Navbar menu={userInfoDetail?.menu} userInfo={userInfoDetail} />
                </div>
                <UserMenu userInfo={userInfoDetail} />
              </Container>
            </div>
          )
        ) : (
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
                <Navbar menu={userInfoDetail?.menu} userInfo={userInfoDetail} />
              </div>
              <UserMenu userInfo={userInfoDetail} />
            </Container>
          </div>
        )}

        <Pagination />
      </header>
    </>
  );
};
export default Header;
