"use client";
import { ResponsivePie } from "@nivo/pie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userSeq: number;
}

const getDeviceType = (userSeq: number) => {
  const url = `http://orientalsalad.kro.kr:8101/members/${userSeq}/trouble-shootings/by-post-type`;
  return axios.get(url);
};

const Pie = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getDeviceType", userSeq],
    queryFn: () => getDeviceType(userSeq),
  });

  const colors = ["hsl(244, 70%, 50%)", "hsl(86, 70%, 50%)", "hsl(10, 70%, 50%)"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myData = data?.data.troubleShootingTypeGroupList.map((troubleType: any, idx: number) => ({
    id: troubleType.name,
    label: troubleType.name,
    value: troubleType.count,
    color: colors[idx],
  }));

  return myData ? (
    <ResponsivePie
      data={myData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "IntelliJ",
          },
          id: "dots",
        },
        {
          match: {
            id: "VS Code",
          },
          id: "dots",
        },
        {
          match: {
            id: "Web",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  ) : (
    <div className="flex items-center justify-center h-full">데이터가 없습니다</div>
  );
};

export default Pie;
