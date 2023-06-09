import { DashboardContainer } from "@/features/dashboard/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const DashboardPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <DashboardContainer />
    </DynamicLayout>
  );
};
export default DashboardPage;

export async function getServerSideProps(context) {
  const token = context.req.cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: "/login", // 토큰이 없을 경우 리디렉션할 페이지
        permanent: false, // 임시 리디렉션을 사용하려면 true로 설정
      },
    };
  }

  return {
    props: {},
  };
}
