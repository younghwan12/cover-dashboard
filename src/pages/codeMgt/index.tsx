import { CodeMgtContainer } from "@/features/codeMgt/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const CodeMgtPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <CodeMgtContainer />
    </DynamicLayout>
  );
};
export default CodeMgtPage;

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
