"use client";
import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userSeq: number;
}

const CirclePacking = ({ userSeq }: Props) => {
  const data2 = {
    name: "root",
    children: [
      {
        name: "node.15",
        value: 59,
      },
      {
        name: "node.16",
        value: 43,
      },
      {
        name: "node.17",
        value: 69,
      },
      {
        name: "node.18",
        value: 82,
      },
      {
        name: "node.19",
        value: 75,
      },
      {
        name: "node.20",
        value: 27,
      },
      {
        name: "node.21",
        value: 66,
      },
    ],
  };

  return (
    <ResponsiveCirclePackingCanvas
      data={data2}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      colors={{ scheme: "spectral" }}
      colorBy="id"
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      padding={1}
      leavesOnly={true}
      enableLabels={true}
      label="id"
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2.4]],
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      animate={false}
    />
  );
};

export default CirclePacking;
