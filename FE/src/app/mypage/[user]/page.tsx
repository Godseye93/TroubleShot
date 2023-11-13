"use client";
import { MyResponsiveRadar } from "@/components/RadarGraph";
import { MyResponsivePie } from "@/components/PieGraph";
import UsedLotTags from "@/components/UsedLotTags";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookmartList from "@/components/BookmartList";
import { getUserInfo } from "@/api/account";

export default function Page({ params }: { params: { userSeq: number } }) {
  const asdasd = getUserInfo(params.userSeq);
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
          <div className="flex justify-center items-center bg-white rounded-lg mb-4 w-full p-5">
            <div className="w-1/6 flex flex-col items-center me-5">
              <img src={userData?.profileImg} alt="trosProfileImg" className="mb-3" />
              <Link href={`/mypage/${user?.member.seq}/edit`} className="text-sub">
                프로필 수정하기
              </Link>
            </div>
            <div className="me-10">
              <p className="text-4xl font-bold">{user?.member.nickname}</p>
              <p>{user?.member.email}</p>
            </div>
            <div className="w-[300px] h-[200px] ms-5">
              <MyResponsiveRadar />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg">
            <div className="w-full bg-main rounded-t-lg px-3 py-2">
              <p className="text-lg">내 트러블 슈팅 요약</p>
            </div>
            <div className="flex w-full rounded-b-lg">
              <div className="w-1/2 px-3 py-5">
                <p className="text-xl p-2">내가 많이 사용한 태그</p>
                <div className="flex flex-wrap w-full">
                  <UsedLotTags />
                </div>
              </div>
              <div className="w-1/2 px-3 py-5 flex flex-col items-center">
                <p className="text-xl pt-2">솔루션 그래프</p>
                <div className="w-[300px] h-[200px]">
                  <MyResponsivePie />
                  {/* <BarChart /> */}
                </div>
                <Link href={`/statistic/${userData?.seq}`} className="text-sub">
                  전체 통계 데이터 확인하기
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 bg-white rounded-lg relative">
          <div className="w-full bg-main rounded-t-lg px-3 py-2">
            <p className="text-lg">북마크</p>
          </div>
          <BookmartList />
          <div className="absolute w-full text-center bottom-0">
            <Link href={"/trouble/bookmark"} className="text-sub">
              전체 북마크 보기
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
