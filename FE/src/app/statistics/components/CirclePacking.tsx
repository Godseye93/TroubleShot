"use client";
import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userSeq: number;
}

const getAllTag = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr:8101/members/${userSeq}/tags/most-used-history?userSeq=${userSeq}`;
  return axios.get(url);
};

const CirclePacking = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getAllTag", userSeq],
    queryFn: () => getAllTag(userSeq),
  });

  const myData = {
    name: "root",
    children: data?.data.tagHistoryList
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        name: item.name,
        value: item.totalCount,
      }))
      .filter((data: { name: string; value: number }) => data.name !== "이있어 답할 단어 없습니다"),
  };

  return (
    myData && (
      <ResponsiveCirclePackingCanvas
        data={myData}
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
    )
  );
};

export default CirclePacking;
