"use client";
import { ResponsiveRadar } from "@nivo/radar";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import { PieGraphInfo, PieGraphInfoAddNick } from "@/types/CommonType";
import { getPieGraphInfo } from "@/api/account";

// 타입 오류 해결
// 백에서 받는 데이터 이름 바꾸기 >> 한국어로

const average = {
  nickname: "평균",
  troubleRank: 50,
  answerRank: 50,
  tagTypeRank: 50,
  replyRank: 50,
  dailyTroubleRank: 50,
};

export function MyResponsiveRadar () {
  const { user } = useLoginStore();
  const nickname:string = user!.member.nickname;
  const userSeq = user?.member.seq;

  // const userData = getPieGraphInfo(userSeq!);
  const [userData, setUserData] = useState<PieGraphInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPieGraphInfo(userSeq!);
      setUserData(data);
    };

    fetchData();
  }, [userSeq]);

  const userDataObj:PieGraphInfoAddNick = {...(userData || {}), nickname, 
  troubleRank: userData?.troubleRank || 0, // 또는 다른 기본값 설정
  answerRank: userData?.answerRank || 0,
  tagTypeRank: userData?.tagTypeRank || 0,
  replyRank: userData?.replyRank || 0,
  dailyTroubleRank: userData?.dailyTroubleRank || 0,};

  const totalData = Object.keys(average)
  .filter((key): key is keyof PieGraphInfoAddNick =>  key !== "nickname")
  .map(key => ({
    rank: key,
    [average.nickname]: average[key],
    [userDataObj.nickname!]: userDataObj[key],
  }));

  return(
  <ResponsiveRadar
    data={totalData}
    keys={["평균", nickname]}
    indexBy="rank"
    maxValue={100}
    valueFormat=">-.2f"
    margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
    borderWidth={3}
    borderColor={{ from: "color", modifiers: [] }}
    // gridLevels={10}
    gridLabelOffset={10}
    enableDots={false}
    dotSize={5}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={{ scheme: "nivo" }}
    blendMode="multiply"
    motionConfig="wobbly"
  />
  );
}