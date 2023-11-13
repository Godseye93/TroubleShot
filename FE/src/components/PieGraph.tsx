import { getBarChartInfo } from "@/api/account";
import { useLoginStore } from "@/stores/useLoginStore";
import { PieGraphInfo } from "@/types/CommonType";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";

export function MyResponsivePie() {
  const { user } = useLoginStore();
  const userSeq = user?.member.seq;

  const [userData, setUserData] = useState<PieGraphInfo | null>(null);

  const fetchUserData = async () => {
    try {
      const data = await getBarChartInfo(userSeq!);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userSeq]);

  const graphData = [
    {
      id: "미해결",
      label: "not solved",
      value: userData?.notSolvedCount,
      color: "hsl(317, 70%, 50%)",
    },
    {
      id: "해결",
      label: "solved",
      value: userData?.solvedCount,
      color: "hsl(23, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePie
      data={graphData}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      // cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set1" }}
      borderWidth={3}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsOffset={-20}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
    />
  );
}
