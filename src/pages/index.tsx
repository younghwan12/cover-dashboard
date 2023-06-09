import { MainContainer } from "@/features/main/component";
import dynamic from "next/dynamic";

const MainPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));

  return (
    <DynamicLayout>
      <MainContainer />
    </DynamicLayout>
  );
};
export default MainPage;
