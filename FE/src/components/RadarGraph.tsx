"use client";
import { ResponsiveRadar } from "@nivo/radar";

type Data = {
  taste: string;
  chardonay: number;
  carmenere: number;
  syrah: number;
}[];

interface Props {
  data: Data;
}

const data = [
  {
    taste: "fruity",
    chardonay: 70,
    carmenere: 110,
    syrah: 100,
  },
  {
    taste: "bitter",
    chardonay: 82,
    carmenere: 116,
    syrah: 50,
  },
  {
    taste: "heavy",
    chardonay: 61,
    carmenere: 59,
    syrah: 86,
  },
  {
    taste: "strong",
    chardonay: 45,
    carmenere: 100,
    syrah: 77,
  },
  {
    taste: "sunny",
    chardonay: 63,
    carmenere: 76,
    syrah: 61,
  },
];

export const MyResponsiveRadar = () => (
  <ResponsiveRadar
    data={data}
    keys={["chardonay", "carmenere", "syrah"]}
    indexBy="taste"
    maxValue={200}
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderWidth={5}
    borderColor={{ from: "color", modifiers: [] }}
    gridLevels={10}
    gridLabelOffset={25}
    enableDots={false}
    dotSize={10}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={{ scheme: "paired" }}
    blendMode="hard-light"
    motionConfig="wobbly"
    // legends={[
    //   {
    //     anchor: "top-left",
    //     direction: "column",
    //     translateX: -50,
    //     translateY: -40,
    //     itemWidth: 80,
    //     itemHeight: 20,
    //     itemTextColor: "#999",
    //     symbolSize: 12,
    //     symbolShape: "circle",
    //     effects: [
    //       {
    //         on: "hover",
    //         style: {
    //           itemTextColor: "#000",
    //         },
    //       },
    //     ],
    //   },
    // ]}
  />
);
