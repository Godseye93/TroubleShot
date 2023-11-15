"use client";
import { usePathname } from "next/navigation";

import { IoHomeSharp } from "react-icons/io5";
import { FaSignsPost } from "react-icons/fa6";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { FaSearch } from "react-icons/fa";

export default function UseCommunitySidebar() {
  const path = usePathname();
  const menus = [
    // eslint-disable-next-line react/jsx-key
    <Link className={`${path === "/community" && "bg-softmain shadow-md"} menu-btn line-clamp-1`} href="/community">
      <IoHomeSharp /> <p className="ms-3 line-clamp-1">메인</p>
    </Link>,
    // eslint-disable-next-line react/jsx-key
    <Link
      className={`${path.includes("/community/posts") && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href="/community/posts"
    >
      <FaSignsPost /> <p className="ms-3 line-clamp-1">전체글 보기</p>
    </Link>,
    <Link
      className={`${path.includes("/community/searchusers") && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href="/community/searchusers"
    >
      <FaSearch /> <p className="ms-3 line-clamp-1">유저 검색</p>
    </Link>,
  ];
  return <Sidebar link="/trouble" menus={menus} />;
}
