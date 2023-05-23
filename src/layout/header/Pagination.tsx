import { BreadCrumb } from "primereact/breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useAppSelector } from "@/redux/hooks";

const { Option } = Select;

interface MenuItem {
    label: string;
    url: string;
    up_menu_name?: string;
}

const Pagination = () => {
    //breadCrumb
    const router = useRouter();

    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const menuItems: MenuItem[] = userInfoDetail?.menu?.map((item) => {
        const label = item.up_menu_name
            ? `${item.up_menu_name} > ${item.menu_name}`
            : item.menu_name;
        return {
            label,
            url: item.menu_location.replace("/service", ""),
        };
    });

    const home = { icon: "pi pi-home", url: "/", label: "홈" };

    const findLabel = (url: string) => {
        const foundItems = menuItems?.filter((item) =>
            url.startsWith(item.url)
        );
        const lastItem = foundItems ? foundItems[foundItems.length - 1] : null;
        return lastItem ? lastItem.label : "";
    };

    const breadcrumbItems = router.pathname
        .split("/")
        .filter((x) => x)
        .map((path, i, arr) => {
            if (i === 1) {
                return null; // 두 번째 '/'로 들어가는 경우는 무시
            }
            return {
                label: findLabel(`/${arr.slice(0, i + 1).join("/")}`),
                url: `/${arr.slice(0, i + 1).join("/")}`.replace(
                    "/service",
                    ""
                ), // /service 부분 제외
            };
        })
        .filter((x): x is { label: string; url: string } => x !== null); // null 값을 제외하고 명시적으로 타입을 지정합니다.

    return (
        <div className="mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center border-gray-300 border-b-[1px] border-t-[1px] bg-gray-50 flex justify-between shadow-md">
            <BreadCrumb model={breadcrumbItems} home={home} />
        </div>
    );
};
export default Pagination;
