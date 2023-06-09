import { IssuesModifyContainer } from "@/features/issues/modify/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const IssuesModifyPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <IssuesModifyContainer />
    </DynamicLayout>
  );
};

export default IssuesModifyPage;
