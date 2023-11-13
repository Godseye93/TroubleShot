import ScrollTop from "@/components/ScrollTop";
import Rsidebar from "../trouble/Rsidebar";
import UseCommunitySidebar from "./UseCommunitySidebar";

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
