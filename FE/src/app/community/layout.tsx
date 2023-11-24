import ScrollTop from "@/components/ScrollTop";
// import UseCommunitySidebar from "./UseCommunitySidebar";
import RsidebarSkeleton from "@/components/Skeletons/RsidebarSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import dynamic from "next/dynamic";
interface Props {
  children: React.ReactNode;
}
const Rsidebar = dynamic(() => import("./Rsidebar"), {
  loading: () => <RsidebarSkeleton />,
});
const UseCommunitySidebar = dynamic(() => import("./UseCommunitySidebar"), {
  loading: () => <SidebarSkeleton />,
});
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="h-12"></div>
      <div className="px-2 flex justify-between">
        <UseCommunitySidebar />
        {children}
        <Rsidebar />
        <ScrollTop />
      </div>
    </>
  );
}
