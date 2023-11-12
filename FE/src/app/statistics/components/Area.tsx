"use client";
import { ResponsiveLine } from "@nivo/line";

interface Props {
  userSeq: number;
}

const Area = ({ userSeq }: Props) => {
  const data = [
    {
      id: "japan",
      color: "hsl(85, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 88,
        },
        {
          x: "helicopter",
          y: 269,
        },
        {
          x: "boat",
          y: 25,
        },
        {
          x: "train",
          y: 267,
        },
        {
          x: "subway",
          y: 216,
        },
        {
          x: "bus",
          y: 69,
        },
        {
          x: "car",
          y: 100,
        },
        {
          x: "moto",
          y: 219,
        },
        {
          x: "bicycle",
          y: 239,
        },
        {
          x: "horse",
          y: 155,
        },
        {
          x: "skateboard",
          y: 168,
        },
        {
          x: "others",
          y: 14,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      enableArea={true}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
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
