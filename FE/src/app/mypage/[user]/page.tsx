"use client";
import { MyResponsiveRadar } from "@/components/RadarGraph";
import { MyResponsivePie } from "@/components/PieGraph";
import UsedLotTags from "@/components/UsedLotTags";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookmartList from "@/components/BookmarkList";
import { getUserInfo } from "@/api/account";
import { Member } from "@/types/CommonType";
import { useLoginStore } from "@/stores/useLoginStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page({ params }: { params: { user: number } }) {
  const { user } = useLoginStore();
  const LoginSeq = user?.member.seq;
  const userSeq = params.user;
  const [mounted, setMounted] = useState<boolean>(false);
  const [userData, setUserData] = useState<Member | null>(null);

  const fetchUserData = async () => {
    try {
      const userData = await getUserInfo(userSeq);
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    setMounted(true);
  }, []);

  return mounted ? (
    <div className="mt-20 mb-5 flex justify-center w-full">
      <div className="w-7/12 me-4">
        <div className="flex justify-center items-center bg-white rounded-lg mb-4 w-full p-5 shadow-md">
          <div className="w-1/6 flex flex-col items-center me-5">
            <img src={userData?.profileImg} alt="trosProfileImg" className="mb-3" />
            {userSeq == LoginSeq && (
              <Link href={`/mypage/${userSeq}/edit`} className="text-sub">
                프로필 수정하기
              </Link>
            )}
          </div>
          <div className="me-10">
            <p className="text-4xl font-bold">{userData?.nickname}</p>
            <p>{userData?.email}</p>
          </div>
          <div className="w-[300px] h-[200px] ms-5">
            <MyResponsiveRadar userSeq={userSeq} nickname={userData?.nickname} />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md">
          <div className="w-full bg-main rounded-t-lg px-3 py-2">
            <p className="text-lg">내 트러블 슈팅 요약</p>
          </div>
          <div className="flex w-full rounded-b-lg">
            <div className="w-1/2 px-3 py-5">
              <p className="text-xl p-2">내가 많이 사용한 태그</p>
              <div className="flex flex-wrap w-full">
                <UsedLotTags userSeq={userSeq} />
              </div>
            </div>
            <div className="w-1/2 px-3 py-5 flex flex-col items-center">
              <p className="text-xl pt-2">솔루션 그래프</p>
              <div className="w-[300px] h-[200px]">
                <MyResponsivePie userSeq={userSeq} />
              </div>
              <Link href={`/statistics/${userSeq}`} className="text-sub">
                전체 통계 데이터 확인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
      {userSeq == LoginSeq && (
        <div className="w-4/12 bg-white rounded-lg relative shadow-md">
          <div className="w-full bg-main rounded-t-lg px-3 py-2">
            <p className="text-lg">북마크</p>
          </div>
          <BookmartList userSeq={userSeq} />
          <div className="absolute w-full text-center bottom-0">
            <Link href={"/trouble/bookmark"} className="text-sub">
              전체 북마크 보기
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="mt-20 mb-5 flex justify-center w-full">
      <div className="w-7/12 me-4">
        <div className="flex justify-center items-center bg-white rounded-lg mb-4 w-full p-5">
          <div className="w-1/6 flex flex-col items-center me-5">
            <Skeleton width={150} height={100} />
            <Skeleton width={150} height={30} />
          </div>
          <div className="me-10">
            <Skeleton width={120} height={40} />
            <Skeleton width={120} height={20} />
          </div>
          <div className="ms-5">
            <Skeleton width={300} height={200} />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg">
          <div className="w-full bg-main rounded-t-lg px-3 py-5"></div>
          <div className="flex w-full rounded-b-lg">
            <div className="w-1/2 px-3 py-5">
              <Skeleton width={200} height={30} />
              <div className="flex flex-wrap w-full mt-2">
                <Skeleton width={200} height={50} count={3} />
                <Skeleton width={200} height={50} count={3} className="ms-5" />
              </div>
            </div>
            <div className="w-1/2 px-3 py-5 flex flex-col items-center">
              <Skeleton width={300} height={200} />
              <Skeleton width={200} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/12 bg-white rounded-lg relative">
        <div className="w-full bg-main rounded-t-lg px-3 py-5"></div>
        <div className="p-5">
          <Skeleton width={500} height={110} />
          <Skeleton width={500} height={110} />
          <Skeleton width={500} height={110} />
          <Skeleton width={500} height={110} />
        </div>
        <div className="absolute w-full text-center bottom-0">
          <Skeleton width={200} height={20} />
        </div>
      </div>
    </div>
  );
}
