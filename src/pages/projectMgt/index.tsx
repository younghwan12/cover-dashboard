import { ProjectMgtContainer } from "@/features/projectMgt/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const ProjectMgtPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <ProjectMgtContainer />
    </DynamicLayout>
  );
};
export default ProjectMgtPage;

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
