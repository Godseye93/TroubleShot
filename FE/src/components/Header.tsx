"use client";
import Link from "next/link";
import Image from "next/image";
import trous_logo_origin from "/public/logo/trous_logo_origin.png";
import { usePathname } from "next/navigation";
import { useLoginStore, user } from "@/stores/useLoginStore";
import { logoutSubmit } from "@/api/account";

export default function Header() {
  const path = usePathname();
  const { toggleLoginStatus } = useLoginStore(); // zustand에서 isLogged 가져와서 헤더 전환

  const isLogged = sessionStorage.getItem("storage-key");
  // const isfsdf = isLogged?.state.isLogged;
  console.log(isLogged);

  const logout = () => {
    async () => {
      // 로그아웃 api 요청
      // 요청 부분 분리하기
      const res = await logoutSubmit({
        seq: user!.member.seq,
        type: 0,
      });
      if (res.success) {
        toggleLoginStatus();
      }
    };
  };

  const userData = user;
  const profileImg = user?.member.profileImg;

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

      {isLogged ? (
        <div className="flex items-center justify-end w-full">
          <Link href={`mypage/${userData?.member.seq}`} className="me-3">
            <img src={profileImg!} alt="" className="w-[2.5rem] rounded-full" />
          </Link>
          <div
            onClick={() => {
              logout();
            }}
            className=""
          >
            <button className="bg-main hover:bg-yellow-700 duration-300 line-clamp-1  text-white font-bold w-20 p-1 rounded me-2">
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
