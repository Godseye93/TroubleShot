"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/TroubleType";

interface Props {
  categories: Category[];
}
export default function CategoryBtn({ categories }: Props) {
  const [isShow, setIsShow] = useState(false);
  const name = decodeURIComponent(usePathname().split("/")[3]);
  // 지금 isShow가 바뀌어서 false인지 알게하는 함수, 이거없으면 맨처음 마운트될때도 닫히는 애니메이션 켜짐
  const [isChanged, setIsChanged] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-between w-full menu-btn mb-2"
        onClick={() => {
          setIsChanged(true);
          setIsShow((prev) => !prev);
        }}
      >
        <div className="flex items-center">
          <BiSolidCategory />
          <p className="ms-3 line-clamp-1">카테고리</p>
        </div>
        <div className="me-5">{!isShow ? <IoIosArrowForward /> : <IoIosArrowDown />}</div>
      </button>
      <div
        className={`flex bg-slate-300 shadow-inner  relative  ${
          isShow ? "menu-anim-on" : isChanged ? "menu-anim-off" : "hidden"
        }`}
      >
        <div className="mt-3 pb-3 w-full">
          {categories.map((category, idx) => (
            <Link href={`/trouble/category/${category.name}`} key={idx}>
              <div
                className={`h-8 ps-[3.5rem] w-full  line-clamp-1 pe-2 hover:bg-slate-200 transition-colors duration-200 rounded-lg hover:shadow-sm ${
                  category.name === name && "bg-slate-200"
                }`}
              >
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
