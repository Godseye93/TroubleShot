import dynamic from "next/dynamic";
// import Rsidebar from "./Rsidebar";
// import UseSidebar from "./UseSidebar";
interface Props {
  children: React.ReactNode;
}
const Rsidebar = dynamic(() => import("./Rsidebar"), {
  loading: () => <p> Loading...,</p>,
});
const UseSidebar = dynamic(() => import("./UseSidebar"), {
  loading: () => <p> Loading...,</p>,
});
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="h-12"></div>
      <div className="px-2 flex justify-between w-full">
        <UseSidebar />
        <div className="mt-4 mx-3 flex-1">{children}</div>
        <Rsidebar />
      </div>
    </>
  );
}
