import { Cascader, Menu, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = ({ menu, userInfo }) => {
  const router = useRouter();
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

  const [visible, setVisible] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "issueMgt",
      label: "유지보수 및 기술지원",
      children: [
        {
          key: "issueMgt_1",
          label: "문의",
          onClick: () => router.push("/issues"),
        },
      ],
    },
    {
      key: "sysMgt",
      label: "시스템 관리",
      children: [
        {
          key: "codeMgt",
          label: "코드정보",
          onClick: () => router.push("/codeMgt"),
        },
        {
          key: "user",
          label: "사용자",
          onClick: () => router.push("/userMgt"),
        },
        {
          key: "projectMgt",
          label: "프로젝트",
          onClick: () => router.push("/projectMgt"),
        },
        {
          key: "settingMgt",
          label: "설정",
          onClick: () => router.push("/settingMgy"),
        },
      ],
    },
    {
      key: "license",
      label: "라이센스 관리",
      onClick: () => router.push("/license"),
    },
    {
      key: "1",
      label: "내 정보",
      onClick: () => setVisible(true),
    },
  ];

  return (
    <>
      {menu ? (
        /** */
        isMobile ? (
          isPhone ? (
            <Menu theme="light" mode="horizontal" items={items} />
          ) : (
            <div className="px-2">
              <div className="flex flex-row items-center justify-between text-gray-700">
                {menu
                  .filter((item) => item.up_menu_id === "0") // 1차 메뉴만 필터링
                  .map((item) => {
                    const subMenus = menu.filter((subItem) => subItem.up_menu_id === item.menu_id); // 하위 메뉴를 필터링

                    return (
                      <div className="relative" key={item.menu_id}>
                        <div className="peer cursor-pointer p-5 text-lg w-10 h-10 flex justify-center items-center rounded-[50%] border-[2px] border-gray-700 mr-5">
                          <Link href={item.menu_location.replace("/service", "")}>{item.menu_name[0]}</Link>
                        </div>
                        {subMenus.length > 0 && (
                          <div className="hidden absolute py-2 px-3 left-0 top-full  peer-hover:flex hover:flex w-40 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                            {subMenus.map((subItem, index) => (
                              <Link
                                key={subItem.menu_id}
                                className={`${
                                  router.pathname === subItem.menu_location ? "text-[#0072bb]" : "text-gray-400"
                                } py-2.5 hover:text-[#0072bb] font-medium text-sm ${
                                  index !== subMenus.length - 1 ? "border-b-[1px]" : ""
                                }`}
                                href={subItem.menu_location.replace("/service", "")}
                              >
                                {subItem.menu_name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                <div className="relative">
                  <div className="peer cursor-pointer text-lg w-10 h-10 flex justify-center items-center rounded-[50%] border-[2px] border-gray-700 mr-5">
                    <Link href="/license">라</Link>
                  </div>
                  <div className="hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-40 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                    <Link className="py-1.5 text-gray-400 hover:text-[#0072bb] font-medium text-sm" href="/license">
                      라이센스관리
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="px-2">
            <div className="flex flex-row items-center justify-between text-gray-700">
              {menu
                .filter((item) => item.up_menu_id === "0") // 1차 메뉴만 필터링
                .map((item) => {
                  const subMenus = menu.filter((subItem) => subItem.up_menu_id === item.menu_id); // 하위 메뉴를 필터링

                  return (
                    <div className="relative" key={item.menu_id}>
                      <div className="peer cursor-pointer text-lg font-semibold mr-5">
                        <Link href={item.menu_location.replace("/service", "")}>{item.menu_name}</Link>
                      </div>
                      {subMenus.length > 0 && (
                        <div className="hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-48 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                          {subMenus.map((subItem, index) => (
                            <Link
                              key={subItem.menu_id}
                              className={`${
                                router.pathname === subItem.menu_location ? "text-[#0072bb]" : "text-gray-400"
                              } py-2.5 hover:text-[#0072bb] font-medium text-sm ${
                                index !== subMenus.length - 1 ? "border-b-[1px]" : ""
                              }`}
                              href={subItem.menu_location.replace("/service", "")}
                            >
                              {subItem.menu_name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

              <div className="relative">
                <div className="peer cursor-pointer text-lg font-semibold mr-5">
                  <Link href="/license">라이센스 관리</Link>
                </div>
                <div className="hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-48 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10]">
                  <Link className="py-2.5 text-gray-400 hover:text-[#0072bb] font-medium text-sm" href="/license">
                    라이센스관리
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
};

export default Navbar;
