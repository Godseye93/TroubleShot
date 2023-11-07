"use client";
import Link from "next/link";
import Image from "next/image";
import trous_logo_origin from "/public/logo/trous_logo_origin.png";
import defaultProfile from "@/../public/defaultProfile.png";
import { usePathname } from "next/navigation";
import { useLoginStore } from "@/stores/useLoginStore";

export default function Header() {
  const path = usePathname();
  const { isLogged, logout } = useLoginStore(); // zustand에서 isLogged 가져와서 헤더 전환

  return (
    <div className="bg-white rounded-lg flex text-xl h-12 justify-between fixed top-2 left-2 right-2 shadow-md z-50">
      <div className="flex items-center">
        <Link href="/" className=" w-2/12 h-2/12 mx-3">
          <Image src={trous_logo_origin} alt="" />
        </Link>
        <Link
          href="/trouble"
          className={`me-5 text-black hover:text-main duration-200 transition-colors ${
            path.includes("/trouble") && "font-semibold"
          }`}
        >
          내 트러블 슈팅
        </Link>
        <Link
          href="/community"
          className={`
        ${
          path.includes("/community") && " font-semibold"
        } me-5 text-black hover:text-main duration-200 transition-colors`}
        >
          커뮤니티
        </Link>
      </div>

      {/* {isLogged ? <div>asd</div> : <Image src={defaultProfile} alt="" className=" w-[3rem]" />} */}

      {isLogged ? (
        <div>
          {/* <Link href={}><Image src={defaultProfile} alt="" className=" w-[3rem]"/></Link> */}
          <div
            onClick={() => {
              logout();
            }}
            className="w-2/12 h-2/12 flex items-center justify-end"
          >
            <button className="bg-main hover:bg-yellow-700 duration-300 line-clamp-1  text-white font-bold w-20 p-1 rounded fcc me-2">
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        <Link href="/login" className="w-2/12 h-2/12 flex items-center justify-end">
          <button className="bg-main hover:bg-yellow-700 duration-300 line-clamp-1  text-white font-bold w-20 p-1 rounded fcc me-2">
            로그인
          </button>
        </Link>
      )}
    </div>
  );
}
