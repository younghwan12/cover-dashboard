import { UserMgtContainer } from "@/features/userMgt/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const UserMgtPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <UserMgtContainer />
    </DynamicLayout>
  );
};
export default UserMgtPage;

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
