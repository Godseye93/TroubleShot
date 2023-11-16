"use client";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { getCategories } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaPen } from "react-icons/fa6";
import { useParams } from "next/navigation";

export default function UseSidebar({ userSeq }: { userSeq: number }) {
  const path = usePathname();
  const { user } = useLoginStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ["othersCategories"],
    queryFn: async () => {
      const data = await getCategories(userSeq);
      return data;
    },
  });

  const params = useParams();
  const categoryName = params.category;
  const [isShow, setIsShow] = useState(false);
  const name = decodeURIComponent(usePathname().split("/")[3]);
  // 지금 isShow가 바뀌어서 false인지 알게하는 함수, 이거없으면 맨처음 마운트될때도 닫히는 애니메이션 켜짐
  const [isChanged, setIsChanged] = useState(false);
  const menus = [
    // eslint-disable-next-line react/jsx-key
    <Link
      className={`${path === `/others/${userSeq}` && "bg-softmain shadow-md"} menu-btn line-clamp-1`}
      href={`/others/${userSeq}`}
    >
      <IoHomeSharp /> <p className="ms-3 line-clamp-1">전체글</p>
    </Link>,
  ];
  return (
    <>
      {data && (
        <div className="w-[14%] h-[91vh] bg-white shadow-lg mt-4 rounded-lg pt-5  flex-col justify-between text-lg md:flex hidden">
          <div>
            {menus.map((menu, idx) => (
              <div key={idx}>{menu}</div>
            ))}

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
                  {data.categoryList.map((category, idx) => (
                    <Link href={`/others/${userSeq}/category/${category.name}`} key={idx}>
                      <div
                        className={`h-8 ps-[3.5rem] w-full  line-clamp-1 pe-2 hover:bg-slate-200 transition-colors duration-200 rounded-full hover:shadow-sm ${
                          category.name === categoryName && "bg-slate-200"
                        }`}
                      >
                        {category.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          </div>
          <div className="flex-col items-center flex">
            <Link
              href={"trouble/create"}
              className="fcc bg-main rounded-full h-10 w-3/4 shadow-orange-700 shadow-md mb-10 flex hover:shadow-md hover:bg-yellow-500 transition-all"
            >
              <FaPen />
              <p className="ms-2">글쓰기</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
