import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import { useAppSelector } from "@/redux/hooks";
import { ChartData } from "chart.js/auto";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useLazyGetDashboardListQuery } from "../../redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "유형별 현황",
        },
    },
    scales: {
        y: {
            max: 6,
            ticks: {
                stepSize: 1,
                beginAtZero: true,
            },
        },
    },
};

const DashboardTable = () => {
    const [chartData, setChartData] = useState<null | ChartData<
        "bar",
        number[],
        unknown
    >>(null);
    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const { searchParams } = useAppSelector((state) => state.dashboard);

    const [getDashboardList, { data: dashboardList, isFetching }] =
        useLazyGetDashboardListQuery();

    // 팝업 열리면 데이터 호출
    useEffect(() => {
        if (token && token?.jwt) {
            getDashboardList({
                ...searchParams,
                jwt: token.jwt,
                login_id: userInfoDetail.jwt.user_id,
            });
        }
    }, [token?.jwt, searchParams]);

    const createDataObject = (dashboardList) => {
        const labels = dashboardList.map((item) => item.code_name);

        const data = {
            labels,
            datasets: [
                {
                    label: "문의사항",
                    data: dashboardList.map((item) => item.all_cnt),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "요청중",
                    data: dashboardList.map((item) => item.request_cnt),
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                    label: "담당자 진행중",
                    data: dashboardList.map((item) => item.charger_ing_cnt),
                    backgroundColor: "rgba(95, 118, 232, 0.5)",
                },
                {
                    label: "답변 완료",
                    data: dashboardList.map((item) => item.complete_cnt),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                },
            ],
        };

        return data;
    };

    // dashboardList가 변경될 때마다 데이터 객체를 생성하여 state를 업데이트합니다.
    useEffect(() => {
        if (dashboardList) {
            const newData = createDataObject(dashboardList.list);
            setChartData(newData);
        }
    }, [dashboardList]);

    return (
        <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
            {chartData && (
                <Bar options={options} data={chartData} className="h-[400px]" />
            )}
        </div>
    );
};

export default DashboardTable;
