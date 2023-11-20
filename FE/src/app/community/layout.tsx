import Rsidebar from "../trouble/Rsidebar";
import UseSidebar from "../trouble/UseSidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="h-12"></div>
      <div className="px-2 flex justify-between">
        <UseSidebar />
        {children}
        <Rsidebar />
      </div>
    </>
  );
}
