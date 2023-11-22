import Link from "next/link";
import { FaPen } from "react-icons/fa";
import CategoryBtn from "./CategoryBtn";
import CategoryAddBtn from "./CategoryAddBtn";
import { Category } from "@/types/TroubleType";
import { useEffect, useState } from "react";
interface Props {
  menus: JSX.Element[];
  categories?: Category[];
  link: string;
  isLogged?: boolean;
  name?: string;
  userSeq?: number;
}

export default function Sidebar({ menus, categories, link, isLogged, userSeq }: Props) {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      const sidebar = document.getElementById("sidebar");
      if (!footer || !sidebar) return;

      const sT = window.scrollY;
      const val = document.documentElement.scrollHeight - window.innerHeight - footer.offsetHeight;

      if (sT > 0 && sT >= val) {
        sidebar.classList.add("on");
      } else {
        sidebar.classList.remove("on");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-[14%] min-h-[91vh] md:flex hidden">
      <div
        className=" w-[14%] h-[91vh] bg-white shadow-lg mt-4 rounded-lg pt-5  flex-col justify-between text-lg md:flex hidden"
        id="sidebar"
      >
        <div>
          {menus.map((menu, idx) => (
            <div key={idx}>{menu}</div>
          ))}
          {isLogged && <CategoryBtn categories={categories ? categories : []} />}
        </div>
        <div className="flex-col items-center flex">
          {isLogged && userSeq && <CategoryAddBtn userSeq={userSeq} categories={categories ? categories : []} />}
          <Link
            href={`${link}/create`}
            className="fcc bg-main rounded-lg h-10 w-3/4 shadow-orange-700 shadow-md mb-10 flex hover:shadow-md hover:bg-yellow-500 transition-all"
          >
            <FaPen />
            <p className="ms-2">글쓰기</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
