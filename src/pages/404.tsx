import Layout from "@/layout/main/Layout";
import dynamic from "next/dynamic";

const Custom404 = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <div>없는 페이지입니다.</div>
    </DynamicLayout>
  );
};

export default Custom404;
