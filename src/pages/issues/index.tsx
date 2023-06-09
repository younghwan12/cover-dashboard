import { IssuesContainer } from "@/features/issues/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const IssuesPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <IssuesContainer />
    </DynamicLayout>
  );
};
export default IssuesPage;

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
