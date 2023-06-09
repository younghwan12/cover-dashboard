import { LicenseContainer } from "@/features/license/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const LicensePage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <LicenseContainer />
    </DynamicLayout>
  );
};

export default LicensePage;

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
