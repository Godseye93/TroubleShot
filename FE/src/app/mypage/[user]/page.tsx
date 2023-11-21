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
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  const getMyQuestionAndAnswer = (userSeq: number) => {
    const url = `http://orientalsalad.kro.kr:8101/members/${userSeq}/statics/count-trouble-and-answer`;
    return axios.get(url);
  };

  const { data: data2 } = useQuery({
    queryKey: ["getMyQuestionAndAnswer", Number(params.user)],
    queryFn: () => getMyQuestionAndAnswer(Number(params.user)),
  });

  return mounted ? (
    <div className="mt-20 mb-5 flex justify-center w-full">
      <div className="w-7/12 me-4">
        <div className="flex justify-around items-center bg-white rounded-lg mb-4 w-full p-5 shadow-md overflow-hidden">
          <div className="flex items-center">
            <div className="me-5">
              <p className="text-4xl font-bold">{userData?.nickname}</p>
              <p>{userData?.email}</p>
            </div>
            <div className=" flex flex-col items-center">
              <img
                src={userData?.profileImg}
                alt="trosProfileImg"
                className="mb-3 rounded-full h-36 w-36 mt-5 min-w-fit"
              />
              {userSeq == LoginSeq && (
                <Link href={`/mypage/${userSeq}/edit`} className="text-sub ">
                  프로필 수정하기
                </Link>
              )}
            </div>
          </div>
          <div className="w-[300px] h-[200px] ms-5">
            <MyResponsiveRadar userSeq={userSeq} nickname={userData?.nickname} />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full bg-main rounded-t-lg px-3 py-2 flex justify-between">
            <p className="text-lg font-bold">내 트러블 슈팅 요약</p>
            <Link href={`/statistics/${userSeq}`} className="text-sub">
              전체 통계 데이터 확인하기
            </Link>
          </div>
          <div className="flex w-full rounded-b-lg justify-around my-5">
            <div className="flex flex-col items-center w-5/12">
              <div className="flex w-3/4 items-baseline justify-around ">
                <p className="text-2xl min-w-fit pt-2 me-1 mb-3">내가 많이 사용한 태그</p>
                <p className=" text-gray-400 min-w-fit">상위 6개</p>
              </div>
              <div className="flex flex-wrap w-full">
                <UsedLotTags userSeq={userSeq} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl pt-2">솔루션 그래프</p>
              <div className="w-[300px] h-[170px]">
                <MyResponsivePie userSeq={userSeq} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {userSeq == LoginSeq && (
        <div className="w-4/12 bg-white rounded-lg relative shadow-md">
          <div className="w-full bg-main rounded-t-lg px-3 py-2 flex justify-between">
            <p className="text-lg font-bold">북마크</p>
            <Link href={"/trouble/bookmark"} className="text-sub">
              전체 북마크 보기
            </Link>
          </div>
          <BookmartList userSeq={userSeq} />
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
