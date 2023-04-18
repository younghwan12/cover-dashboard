import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = ({ menu }) => {
    const router = useRouter();

    return (
        <>
            {menu && (
                <div className="px-2">
                    <div className="flex flex-row items-center justify-between text-gray-700">
                        {menu
                            .filter((item) => item.up_menu_id === "0") // 1차 메뉴만 필터링
                            .map((item) => {
                                const subMenus = menu.filter(
                                    (subItem) =>
                                        subItem.up_menu_id === item.menu_id
                                ); // 하위 메뉴를 필터링

                                return (
                                    <div
                                        className="relative"
                                        key={item.menu_id}
                                    >
                                        <div className="peer cursor-pointer text-lg font-semibold mr-5">
                                            <Link
                                                href={item.menu_location.replace(
                                                    "/service",
                                                    ""
                                                )}
                                            >
                                                {item.menu_name}
                                            </Link>
                                        </div>
                                        {subMenus.length > 0 && (
                                            <div className="hidden absolute py-2 px-3 left-0 top-full peer-hover:flex hover:flex w-48 flex-col bg-white shadow-md border-t-[3px] border-[#0072bb] z-[10] transform translate-y-30 transition-all duration-500 ease-out">
                                                {subMenus.map((subItem) => (
                                                    <Link
                                                        key={subItem.menu_id}
                                                        className={`${
                                                            router.pathname ===
                                                            subItem.menu_location
                                                                ? "text-[#0072bb]"
                                                                : "text-gray-400"
                                                        } py-2.5 hover:text-[#0072bb] font-medium text-sm`}
                                                        href={subItem.menu_location.replace(
                                                            "/service",
                                                            ""
                                                        )}
                                                    >
                                                        {subItem.menu_name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
