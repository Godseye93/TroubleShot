"use client";
import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { getLast10Days } from "@/utils/getLast10Days";

interface Props {
  userSeq: number;
}
export function getLastDays(count: number): string[] {
  const dates: string[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const formattedDate = date.toISOString().split("T")[0];
    dates.push(formattedDate);
  }

  return dates;
}

const getTopTagChange = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr/api/user/members/${userSeq}/tags/most-used-history?userSeq=${userSeq}&day=5&count=5`;
  return axios.get(url);
};

const Line = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getTopTagChange", userSeq],
    queryFn: () => getTopTagChange(userSeq),
  });
  const colors = [
    "hsl(353, 70%, 50%)",
    "hsl(321, 70%, 50%)",
    "hsl(19, 70%, 50%)",
    "hsl(342, 70%, 50%)",
    "hsl(293, 70%, 50%)",
  ];

  const days = getLastDays(5).reverse();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myData = data?.data.tagHistoryList.map((tagHistory: any, idx: number) => ({
    id: tagHistory.name,
    color: colors[idx],
    data: days.map((day: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const historyForDay = tagHistory.dailyHistoryList.find((history: any) => history.date === day);

      return {
        x: day,
        y: historyForDay ? historyForDay.count : 0,
      };
    }),
  }));

  return myData?.data ? (
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
        legend: "사용 횟수",
        legendOffset: -40,
        legendPosition: "middle",
        format: (e) => {
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
  ) : (
    <div className="flex items-center justify-center h-full">데이터가 없습니다</div>
  );
};

export default Line;
