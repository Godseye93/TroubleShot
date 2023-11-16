"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import blackLogo from "../../public/logo/trous_withoutLogo_origin.png";

export default function Footer() {
  const path = usePathname();

  return (
    <div
      id="footer"
      className={`${path === "/" && "hidden"} flex w-full border-t-2 mt-20 bg-white  justify-between py-5`}
    >
      <ul className="w-fit mt-3 ms-3">
        <li>
          <Image src={blackLogo} alt="" className="w-[25vw]" />
        </li>
      </ul>
      <div className="flex">
        <ul className="w-fit me-10 p-3 list-none">
          <li className="mb-2">
            <p className="border-b border-main">오리엔탈 샐러드</p>
          </li>
          <li>정슬호</li>
          <li>고예림</li>
          <li>권종률</li>
          <li>김수현</li>
          <li>손재형</li>
          <li>장진욱</li>
        </ul>
        <ul className="w-fit me-5 p-3 list-none">
          <li className="mb-2">
            <p className="border-b border-main">관련 사이트</p>
          </li>
          <li>팀 노션 페이지</li>
          <li>팀 깃랩</li>
        </ul>
      </div>
    </div>
  );
}
