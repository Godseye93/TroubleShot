import UseSidebar from "./UseSidebar";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="h-12"></div>
      <div className="px-2 flex">
        <UseSidebar />
        {children}
      </div>
    </>
  );
}
