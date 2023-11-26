"use client";
import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getLastDays } from "./Line";

interface Props {
  userSeq: number;
}

const getAccumulation = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr/api/user/members/${userSeq}/trouble-shootings/history?userSeq=${userSeq}&day=4`;
  return axios.get(url);
};

const Area = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getAccumulation", userSeq],
    queryFn: () => getAccumulation(userSeq),
  });
  const days = getLastDays(5).reverse();
  const myData = [
    {
      id: "작성한 트러블 슈팅",
      color: "hsl(285, 70%, 50%)",
      data: days.reduce((acc: { x: string; y: number }[], day) => {
        // 현재 날짜의 count를 찾거나 0을 할당
        const currentCount =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data.troubleShootingHistoryList.find((history: any) => history.date === day)?.count || 0;

        // 이전 날짜까지의 누적값을 가져오거나 초기값 0 설정
        const previousTotal = acc.length > 0 ? acc[acc.length - 1].y : 0;

        // 현재 날짜의 누적값 계산
        const cumulativeTotal = previousTotal + currentCount;

        // 누적값을 포함하여 배열에 추가
        acc.push({ x: day, y: cumulativeTotal });
        return acc;
      }, []),
    },
  ];

  return (
    <ResponsiveLine
      data={myData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=">-.2d"
      axisTop={null}
      axisRight={null}
      enableArea={true}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        format: (e: any) => {
          if (Math.floor(e) === e) {
            return e;
          }
          return "";
        },
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Area;
