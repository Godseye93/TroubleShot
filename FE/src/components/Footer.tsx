"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import blackLogo from "../../public/logo/trous_withoutLogo_black.png"

export default function Footer() {
  const path = usePathname();

  return (
    <div id="footer" className={`${path === "/"  && "hidden"} flex w-full border-t-2 border-gray-400`}>
      <ul className="w-3/12">
        <li><Image src={blackLogo} alt="" className=""/></li>
      </ul>
      <div className="flex w-5/12">
        <ul className="w-1/2">
            <li><div className="">오리엔탈 샐러드</div></li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
        </ul>
        <ul className="w-1/2">
            <li>관련 사이트</li>
            <li>팀 노션 페이지</li>
            <li>팀 깃랩</li>
        </ul>
      </div>
    </div>
  );
}
