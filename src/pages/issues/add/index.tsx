import { IssuesAddContainer } from "@/features/issues/add/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const IssuesAddPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <IssuesAddContainer />
    </DynamicLayout>
  );
};
export default IssuesAddPage;
