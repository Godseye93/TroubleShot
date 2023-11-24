"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import blackLogo from "../../public/logo/trous_withoutLogo_origin.png";
import Link from "next/link";

export default function Footer() {
  const path = usePathname();

  return (
    <div id="footer">
      <div className="h-[80px]"></div>

      <div className={`${path === "/" && "hidden"} flex w-full border-t-2 bg-white  justify-between py-5`}>
        <ul className="w-fit mt-3 ms-3 list-none">
          <li>
            <Image src={blackLogo} alt="" className="w-[25vw]" />
          </li>
        </ul>
        <div className="flex mr-56">
          <ul className="w-fit me-10 p-3 list-none">
            <li className="mb-2">
              <p className="border-b border-main">오리엔탈 샐러드</p>
            </li>
            <div className=" flex gap-4">
              <li>
                <Link href={"https://github.com/Jeongseulho"} target="_blank">
                  정슬호
                </Link>
              </li>
              <li>
                <Link href={"https://github.com/YeahLim"} target="_blank">
                  고예림
                </Link>
              </li>
              <li>
                <Link href={"https://github.com/KwonJongryul"} target="_blank">
                  권종률
                </Link>
              </li>
              <li>
                <Link href={"https://github.com/khnemu11"} target="_blank">
                  김수현
                </Link>
              </li>
              <li>
                <Link href={"https://github.com/sonesonjabgo"} target="_blank">
                  손재형
                </Link>
              </li>
              <li>
                <Link href={"https://github.com/Godseye93"} target="_blank">
                  장진욱
                </Link>
              </li>
            </div>
          </ul>
          <ul className="w-fit me-5 p-3 list-none">
            <li className="mb-2">
              <p className="border-b border-main">관련 사이트</p>
            </li>
            <li>
              <Link href={"https://www.notion.so/f5f1140250ad49c18024035a3a2fb1d9"} target="_blank">
                팀 노션 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
