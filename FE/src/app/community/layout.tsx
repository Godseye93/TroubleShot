import ScrollTop from "@/components/ScrollTop";
import UseCommunitySidebar from "./UseCommunitySidebar";
import Rsidebar from "./Rsidebar";
interface Props {
  children: React.ReactNode;
}

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
