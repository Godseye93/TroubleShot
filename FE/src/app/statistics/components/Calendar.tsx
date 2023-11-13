"use client";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userSeq: number;
}

const getCalendar = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr:8101/members/${userSeq}/trouble-shootings/history?userSeq=${userSeq}&day=100`;
  return axios.get(url);
};

const Calendar = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getCalendar", userSeq],
    queryFn: () => getCalendar(userSeq),
  });
  const myData = data?.data.troubleShootingHistoryList?.map((item: any) => ({
    value: item.count,
    day: item.date,
  }));
  const toDay = new Date();
  const beforeDay = new Date();
  beforeDay.setDate(toDay.getDate() - 100);

  return (
    myData && (
      <ResponsiveTimeRange
        data={myData}
        from={beforeDay.toISOString().split("T")[0]}
        to={toDay.toISOString().split("T")[0]}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        weekdayTicks={[0, 1, 2, 3, 4, 5, 6]}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
            translateX: -100,
            translateY: -90,
            symbolSize: 20,
          },
        ]}
      />
    )
  );
};

export default Calendar;
