"use client";
import { usePathname } from "next/navigation";

import { IoHomeSharp } from "react-icons/io5";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function UseSidebar() {
  const path = usePathname();
  const categorys = ["낙서장", "javascript", "react", "typescript", "nextjs", "vuejs", "긴놈오오오오오ㅗ옹오오오오옴"];
  const menus = [
    <Link className={`${path === "/trouble" && "bg-softmain shadow-md"} menu-btn line-clamp-1`} href="/trouble">
      <IoHomeSharp /> <p className="ms-3 line-clamp-1">전체글</p>
    </Link>,
    <Link
      className={`${path === "/trouble/bookmark" && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href="/trouble/bookmark"
    >
      <BsFillBookmarkStarFill /> <p className="ms-3 line-clamp-1">북마크</p>
    </Link>,
  ];
  return <Sidebar menus={menus} categorys={categorys} />;
}
