"use client";
import { usePathname } from "next/navigation";

import { IoHomeSharp } from "react-icons/io5";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getCategories } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function UseSidebar() {
  const path = usePathname();
  const { user } = useLoginStore();
  // const categorys = ["낙서장", "javascript", "react", "typescript", "nextjs", "vuejs", "긴놈오오오오오ㅗ옹오오오오옴"];
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!user) return;
      const data = await getCategories(user?.member.seq);
      return data;
    },
  });

  const menus = [
    // eslint-disable-next-line react/jsx-key
    <Link
      className={`${path.includes("/trouble/bookmark") && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href="/trouble/bookmark"
    >
      <BsFillBookmarkStarFill /> <p className="ms-3 line-clamp-1">북마크</p>
    </Link>,
    // eslint-disable-next-line react/jsx-key
    <Link className={`${path === "/trouble" && "bg-softmain shadow-md"} menu-btn line-clamp-1`} href="/trouble">
      <IoHomeSharp /> <p className="ms-3 line-clamp-1">전체글</p>
    </Link>,
  ];
  return (
    <>
      {data && user && (
        <Sidebar
          link="/trouble"
          userSeq={user.member.seq}
          menus={menus}
          categories={data.categoryList}
          isLogged={true}
        />
      )}
    </>
  );
}
