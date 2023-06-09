import { IssuesDetailContainer } from "@/features/issues/detail/component";
import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const IssuesDetailPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <IssuesDetailContainer />
    </DynamicLayout>
  );
};
export default IssuesDetailPage;
