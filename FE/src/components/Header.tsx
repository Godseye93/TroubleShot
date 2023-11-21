"use client";
import Link from "next/link";
import Image from "next/image";
import trous_logo_origin from "/public/logo/trous_logo_origin.png";
import { usePathname, useRouter } from "next/navigation";
import { useLoginStore } from "@/stores/useLoginStore";
import { logoutSubmit } from "@/api/account";
import { useEffect, useState } from "react";
import { useUserTabStore } from "@/stores/useUserTabStore";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const path = usePathname();
  const { user, userLogout } = useLoginStore(); // zustand에서 isLogged 가져와서 헤더 전환
  const [mounted, setMounted] = useState<boolean>(false);
  const { nickname, seq, setDelTabUser } = useUserTabStore();
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const logout = async () => {
    // 로그아웃 api 요청
    // 요청 부분 분리하기
    try {
      const res = await logoutSubmit({
        seq: user!.member.seq,
        type: 0,
      });
      if (res.success) {
        userLogout();
        setDelTabUser();
        window.location.href = "/";
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const onCloseTab = async () => {
    router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기 작업을 기다림
    setDelTabUser();
  };
  return (
    mounted && (
      <div className="bg-white rounded-lg flex text-xl h-12 justify-between fixed top-2 left-2 right-2 shadow-md z-50">
        <div className="flex items-center">
          <Link href="/" className=" w-2/12 h-2/12 ms-3 me-5">
            <Image src={trous_logo_origin} alt="" />
          </Link>
          <Link
            href="/trouble"
            className={`me-5  hover:text-main duration-200 transition-colors ${
              path.includes("/trouble") && "font-semibold text-amber-500"
            }`}
          >
            내 트러블 슈팅
          </Link>
          <Link
            href="/community"
            className={`
        ${
          path.includes("/community") && " font-semibold text-amber-500"
        } me-5  hover:text-main duration-200 transition-colors`}
          >
            커뮤니티
          </Link>
          {seq && nickname && (
            <div
              className={`flex items-center ${
                path.includes("/others") && "bg-main"
              } rounded-lg py-1 px-2 shadow-md hover:bg-amber-500`}
            >
              <Link href={`/others/${seq}`}>
                <button>{nickname}님의 트러블슈팅</button>
              </Link>
              <div
                className="text-base hover:text-sub transition-colors duration-200 hover:cursor-pointer ms-2"
                onClick={onCloseTab}
              >
                <AiOutlineClose />
              </div>
            </div>
          )}
        </div>

        {user ? (
          <div className="flex items-center justify-end w-full">
            <Link href={`/mypage/${user?.member.seq}`} className="me-3 rounded-full">
              <img src={user.member.profileImg} alt="" className="w-[2.5rem]" />
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
    )
  );
}
