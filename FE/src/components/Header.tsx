"use client";
import Link from "next/link";
import Image from "next/image";
import trous_logo_origin from "/public/logo/trous_logo_origin.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

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
      <div className="w-2/12 h-2/12 flex items-center justify-end">
        <button className="bg-main hover:bg-yellow-700 duration-300 line-clamp-1  text-white font-bold py-2 px-4 rounded h-5/6 fcc me-2">
          로그인
        </button>
      </div>
    </div>
  );
}
