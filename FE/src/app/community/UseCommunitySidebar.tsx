"use client";
import { usePathname } from "next/navigation";

import { IoHomeSharp } from "react-icons/io5";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function UseCommunitySidebar() {
  const path = usePathname();
  const menus = [
    // eslint-disable-next-line react/jsx-key
    <Link className={`${path === "/trouble" && "bg-softmain shadow-md"} menu-btn line-clamp-1`} href="/trouble">
      <IoHomeSharp /> <p className="ms-3 line-clamp-1">전체글</p>
    </Link>,
    // eslint-disable-next-line react/jsx-key
    <Link
      className={`${path === "/trouble/bookmark" && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href="/trouble/bookmark"
    >
      <BsFillBookmarkStarFill /> <p className="ms-3 line-clamp-1">북마크</p>
    </Link>,
  ];
  return <Sidebar link="/trouble" menus={menus} />;
}
