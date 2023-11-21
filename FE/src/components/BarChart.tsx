"use client";
import { getBarChartInfo } from "@/api/account";
import { useLoginStore } from "@/stores/useLoginStore";
import { BarChartInfo } from "@/types/CommonType";
import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";

const exampleData = [
  {
    id: "해결 안됨",
    trouble: 1,
  },
  {
    id: "해결 됨",
    trouble: 1,
  },
  {
    id: "전체",
    trouble: 2,
  },
];

export default function BarChart() {
  const { user } = useLoginStore();
  const userSeq = user?.member.seq;

  const [userData, setUserData] = useState<BarChartInfo | null>(null);

  const fetchData = async () => {
    try {
      const data = await getBarChartInfo(userSeq!);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <ResponsiveBar
      data={exampleData!}
      indexBy="id"
      keys={["trouble"]}
      margin={{ top: 20, right: 50, bottom: 20, left: 60 }}
      layout="horizontal"
      axisBottom={null}
    />
  );
}
