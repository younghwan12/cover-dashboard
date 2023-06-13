import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { useAppSelector } from "@/redux/hooks";
import { ChartData } from "chart.js/auto";

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useLazyGetDashboardListQuery } from "../../redux";
import { DashboardList } from "../../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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
      max: 14,
      ticks: {
        stepSize: 2,
        beginAtZero: true,
      },
    },
  },
};

const DashboardTable = () => {
  const [chartData, setChartData] = useState<null | ChartData<"bar", number[], unknown>>(null);
  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);
  const [allCount, setAllCount] = useState<DashboardList>();

  const { searchParams } = useAppSelector((state) => state.dashboard);

  const [getDashboardList, { data: dashboardList, isFetching }] = useLazyGetDashboardListQuery();

  // 팝업 열리면 데이터 호출
  useEffect(() => {
    if (token && token?.jwt) {
      getDashboardList({
        ...searchParams,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    }
  }, [token?.jwt, searchParams]);

  const createDataObject = (dashboardList) => {
    const labels = dashboardList?.map((item) => item.code_name);

    const data = {
      labels,
      datasets: [
        {
          label: "문의사항",
          data: dashboardList?.map((item) => item.all_cnt),
          backgroundColor: "rgb(247, 163, 92)",
        },
        {
          label: "요청중",
          data: dashboardList?.map((item) => item.request_cnt),
          backgroundColor: "rgb(255, 103, 125)",
        },
        {
          label: "담당자 진행중",
          data: dashboardList?.map((item) => item.charger_ing_cnt),
          backgroundColor: "rgb(95, 118, 232)",
        },
        {
          label: "답변 완료",
          data: dashboardList?.map((item) => item.complete_cnt),
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    };

    return data;
  };

  const createCountObject = (dashboardList) => {
    const dataObject = {
      all_cnt: 0,
      charger_ing_cnt: 0,
      complete_cnt: 0,
      request_cnt: 0,
    };

    dashboardList?.forEach((item) => {
      dataObject.all_cnt += item.all_cnt;
      dataObject.charger_ing_cnt += item.charger_ing_cnt;
      dataObject.complete_cnt += item.complete_cnt;
      dataObject.request_cnt += item.request_cnt;
    });

    return dataObject;
  };

  // dashboardList가 변경될 때마다 데이터 객체를 생성하여 state를 업데이트합니다.
  useEffect(() => {
    if (dashboardList) {
      const newData = createDataObject(dashboardList.list);
      const allCount = createCountObject(dashboardList.list);
      setChartData(newData);
      setAllCount(allCount);
    }
  }, [dashboardList]);

  return (
    <>
      <div className="mt-10 max-w-[85%] mx-auto">
        <div className="mb-12">
          {/* <h2>상태별 현황</h2> */}
          <div className="flex justify-around items-center">
            <div className="w-24 h-24 rounded-[50%] text-center">
              <div className="circle bg-gray-100 text-[#F7A35C] text-4xl font-extrabold">{allCount?.all_cnt}</div>
              <div className="mt-3">문의사항</div>
            </div>
            <div className="w-24 h-24 rounded-[50%] text-center">
              <div className="circle bg-gray-100 text-[#FF677D] text-4xl font-extrabold">{allCount?.request_cnt}</div>
              <div className="mt-3">요청중</div>
            </div>
            <div className="w-24 h-24 rounded-[50%] text-center">
              <div className="circle bg-gray-100 text-[#5F76E8] text-4xl font-extrabold">
                {allCount?.charger_ing_cnt}
              </div>
              <div className="mt-3">담당자 진행중</div>
            </div>
            <div className="w-24 h-24 rounded-[50%] text-center">
              <div className="circle bg-gray-50 text-[#4BC0C0] text-4xl font-extrabold">{allCount?.complete_cnt}</div>
              <div className="mt-3">답변 완료</div>
            </div>
          </div>
        </div>
        <div>{chartData && <Bar options={options} data={chartData} className="h-[400px]" />}</div>
      </div>
    </>
  );
};

export default DashboardTable;
