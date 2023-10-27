import CommonComponent from "@/components/CommonComponent";
import Sidebar from "@/components/Sidebar";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import Link from "next/link";
export default function Page() {
  const menus = [
    <Link className="fcc hvc rounded-full" href="/trouble">
      <IoHomeSharp /> <p>전체글</p>
    </Link>,
    <Link className="fcc hvc rounded-full " href="/bookmark">
      <BsFillBookmarkStarFill /> <p>북마크</p>
    </Link>,
  ];
  return (
    <main>
      <div className="flex">
        <Sidebar menus={menus} />
        <CommonComponent />
      </div>
    </main>
  );
}
