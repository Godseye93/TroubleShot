"use client";
import { ResponsiveRadar } from "@nivo/radar";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import { RadarGraphInfoAddNick, RadarToUseInfo } from "@/types/CommonType";
import { getRadarGraphInfo } from "@/api/account";

// 아무것도 없을 때 100으로 뜸

export function MyResponsiveRadar() {
  const average = {
    nickname: "평균",
    질문력: 50,
    답변력: 50,
    태그다양성: 50,
    댓글력: 50,
    열정도: 50,
  };
  const { user } = useLoginStore();
  const nickname: string = user!.member.nickname;
  const userSeq = user?.member.seq;

  const [userData, setUserData] = useState<RadarToUseInfo | null>(null);

  const fetchUserData = async () => {
    try {
      const data = await getRadarGraphInfo(userSeq!);
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...{
          질문력: data.troubleRank,
          답변력: data.answerRank,
          태그다양성: data.tagTypeRank,
          댓글력: data.replyRank,
          열정도: data.dailyTroubleRank,
        },
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userSeq]);

  const userDataObj: RadarGraphInfoAddNick = {
    ...(userData || {}),
    nickname,
    질문력: userData?.질문력 || 0,
    답변력: userData?.답변력 || 0,
    태그다양성: userData?.태그다양성 || 0,
    댓글력: userData?.댓글력 || 0,
    열정도: userData?.열정도 || 0,
  };

  const totalData = Object.keys(average)
    .filter((key): key is keyof RadarGraphInfoAddNick => key !== "nickname")
    .map((key) => ({
      rank: key,
      [average.nickname]: average[key],
      [userDataObj.nickname!]: userDataObj[key],
    }));

  return (
    <ResponsiveRadar
      data={totalData}
      keys={[nickname, "평균"]}
      indexBy="rank"
      maxValue={100}
      valueFormat=">-.2f"
      margin={{ top: 20, bottom: 20 }}
      borderWidth={3}
      borderColor={{ from: "color", modifiers: [] }}
      // gridLevels={10}
      gridLabelOffset={10}
      enableDots={false}
      dotSize={5}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "accent" }}
      blendMode="multiply"
      motionConfig="wobbly"
    />
  );
}
