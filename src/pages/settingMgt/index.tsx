import { SettingMgtContainer } from "@/features/settingMgt/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const SettingMgtPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <SettingMgtContainer />
    </DynamicLayout>
  );
};
export default SettingMgtPage;

export async function getServerSideProps(context) {
  const token = context.req.cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
