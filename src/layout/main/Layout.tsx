import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
// import { Menu, Layout as antdLayout } from "antd";

// const { Header } = antdLayout;

interface MenuItem {
  label: string;
  desc: string;
  url: string;
  depth: number;
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const userInfoDetail = useAppSelector((state) => state.login?.userInfoDetail);

  const menuItems: MenuItem[] = userInfoDetail?.menu?.map((item) => ({
    label: item.menu_name,
    desc: item.menu_desc,
    url: item.menu_location.replace("/service", ""),
    depth: item.menu_depth,
  }));

  const currentUrl = router.pathname;
  const currentItem = menuItems?.filter((item) => item.url === currentUrl);

  let selectedMenuItem: MenuItem | undefined;
  if (currentItem && currentItem.length > 0) {
    selectedMenuItem = currentItem.find((item) => item.depth === 2) ?? currentItem[0];
  }

  // `Header` 컴포넌트의 렌더링 여부를 결정하는 변수
  const shouldRenderHr = router.pathname !== "/" && router.pathname !== "/license";

  const isIssuesPage =
    currentUrl === "/issues/add" || currentUrl === "/issues/detail" || currentUrl === "/issues/modify";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1060);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <Header />
          <div className="max-w-[2520px] min-h-screen pt-36 mx-auto px-4 relative items-center">
            {currentItem && (
              <div className="text-center mt-10">
                <h2 className="text-2xl font-medium">{isIssuesPage ? "문의" : selectedMenuItem?.label ?? ""}</h2>
                {shouldRenderHr && <hr className=" w-[20px] mx-auto my-2 border-[#000]" />}
                <div className=" text-[#909090] font-light">
                  {isIssuesPage ? "문의 설명" : selectedMenuItem?.desc ?? ""}
                </div>
              </div>
            )}
            {children}
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <div className="max-w-[2520px] min-h-screen pt-36 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center">
            {currentItem && (
              <div className="text-center mt-10">
                <h2 className="text-2xl font-medium">{isIssuesPage ? "문의" : selectedMenuItem?.label ?? ""}</h2>
                {shouldRenderHr && <hr className=" w-[20px] mx-auto my-2 border-[#000]" />}
                <div className=" text-[#909090] font-light">
                  {isIssuesPage ? "문의 설명" : selectedMenuItem?.desc ?? ""}
                </div>
              </div>
            )}
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
