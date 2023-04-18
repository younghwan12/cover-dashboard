import { BreadCrumb } from "primereact/breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useAppSelector } from "@/redux/hooks";

const { Option } = Select;

interface MenuItem {
    label: string;
    url: string;
}

const Pagination = () => {
    //breadCrumb
    const router = useRouter();

    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const menuItems: MenuItem[] = userInfoDetail?.menu.map((item) => ({
        label: item.menu_name,
        url: item.menu_location.replace("/service", ""),
    }));

    const home = { icon: "pi pi-home", url: "/", label: "홈" };
    // URL에 맞는 한글명을 찾는 함수
    const findLabel = (url: string) => {
        const found = menuItems?.find((item) => item.url === url);
        return found ? found.label : "";
    };

    const breadcrumbItems = router.pathname
        .split("/")
        .filter((x) => x)
        .map((path, i, arr) => ({
            label: findLabel(`/${arr.slice(0, i + 1).join("/")}`),
            url: `/${arr.slice(0, i + 1).join("/")}`,
        }));

    //select
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className="py-3 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 relative items-center border-gray-300 border-b-[1px] border-t-[1px] bg-gray-50 flex justify-between">
            <BreadCrumb model={breadcrumbItems} home={home} />
            {/* <div className="flex">
                <Select
                    style={{ width: 250 }}
                    onChange={handleChange}
                    options={[
                        {
                            value: "1",
                            label: "KB IQ+ 빌드배포테스트 자동화 시스템 구축 프로젝트",
                        },
                        {
                            value: "2",
                            label: "나라키움 차세대 소스코드 점검 시스템 구축",
                        },
                    ]}
                />
            </div> */}
        </div>
    );
};
export default Pagination;
