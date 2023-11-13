"use client";
import { ResponsivePie } from "@nivo/pie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  userSeq: number;
}

const getQuestionTag = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr:8101/members/${userSeq}/tags/trouble-shootings`;
  return axios.get(url);
};

const colors = [
  "hsl(10, 70%, 50%)",
  "hsl(30, 70%, 50%)",
  "hsl(50, 70%, 50%)",
  "hsl(70, 70%, 50%)",
  "hsl(90, 70%, 50%)",
  "hsl(110, 70%, 50%)",
  "hsl(130, 70%, 50%)",
  "hsl(150, 70%, 50%)",
  "hsl(170, 70%, 50%)",
  "hsl(190, 70%, 50%)",
  "hsl(210, 70%, 50%)",
  "hsl(230, 70%, 50%)",
  "hsl(250, 70%, 50%)",
  "hsl(270, 70%, 50%)",
  "hsl(290, 70%, 50%)",
  "hsl(310, 70%, 50%)",
  "hsl(330, 70%, 50%)",
];

const QuestionPie = ({ userSeq }: Props) => {
  const { data } = useQuery({
    queryKey: ["getQuestionTag", userSeq],
    queryFn: () => getQuestionTag(userSeq),
  });

  const myData = data?.data.tagHistoryList.map((tag: any, idx: number) => ({
    id: tag.name,
    label: tag.name,
    value: tag.totalCount,
    color: colors[idx],
  }));

  return (
    myData && (
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
      />
    )
  );
};

export default QuestionPie;
