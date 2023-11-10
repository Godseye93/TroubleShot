"use client";
import { MyResponsiveRadar } from "@/components/RadarGraph";
import { MyResponsivePie } from "@/components/PieGraph";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const { user } = useLoginStore();
  const userData = user?.member;

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className="mt-20 mb-5 flex justify-center w-full">
        <div className="w-7/12 me-4">
          <div className="flex justify-between items-center bg-white rounded-lg mb-4 w-full p-5">
            <div className="w-1/6 flex-col ">
              <img src={userData?.profileImg} alt="trosProfileImg" className="" />
              <Link href="/">프로필 수정하기</Link>
            </div>
            <div>
              <p>{user?.member.nickname}</p>
              <p>{user?.member.email}</p>
              <p>{user?.member.locale}</p>
            </div>
            <div className="w-[300px] h-[200px]">
              <MyResponsiveRadar />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg">
            <div className="w-full bg-main rounded-t-lg px-3 py-2">
              <p className="text-lg">내 트러블 슈팅 요약</p>
            </div>
            <div className="flex w-full rounded-b-lg">
              <div className="w-1/2 p-5">
                <p>내가 많이 사용한 태그</p>
                <div className="flex flex-wrap w-full">
                  <div className="bg-softmain w-1/2 p-2">tag 1</div>
                  <div className="bg-softmain w-1/2 p-2">tag 2</div>
                  <div className="bg-softmain w-1/2 p-2">tag 3</div>
                  <div className="bg-softmain w-1/2 p-2">tag 4</div>
                </div>
              </div>
              <div className="w-1/2 p-5">
                <p>솔루션 그래프</p>
                <div className="w-[300px] h-[200px]">
                  <MyResponsivePie />
                </div>
                <p>asdsda</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 bg-white rounded-lg relative">
          <div className="w-full bg-main rounded-t-lg px-3 py-2">
            <p className="text-lg">북마크</p>
          </div>
          <div>북마크 내용</div>
          <div className="absolute w-full text-center bottom-0">
            <Link href={"/trouble/bookmark"} className=" ">
              전체 북마크 보기
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
