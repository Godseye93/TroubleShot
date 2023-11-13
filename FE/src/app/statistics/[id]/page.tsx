"use client";
import CirclePacking from "../components/CirclePacking";
import Line from "../components/Line";
import Calendar from "../components/Calendar";
import Pie from "../components/Pie";
import Area from "../components/Area";
import QuestionPie from "../components/QuestionPie";
import ResponsePie from "../components/ResponsePie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: {
    id: string;
  };
}
const getSolvedAndUnSolvedCnt = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr:8101/members/${userSeq}/trouble-shootings/by-solve`;
  return axios.get(url);
};

const getMyQuestionAndAnswer = (userSeq: number) => {
  const url = `https://orientalsalad.kro.kr:8101/members/${userSeq}/statics/count-trouble-and-answer`;
  return axios.get(url);
};

export default function Page({ params }: Props) {
  const { data } = useQuery({
    queryKey: ["getSolvedUnsolvedCnt", Number(params.id)],
    queryFn: () => getSolvedAndUnSolvedCnt(Number(params.id)),
  });

  const { data: data2 } = useQuery({
    queryKey: ["getMyQuestionAndAnswer", Number(params.id)],
    queryFn: () => getMyQuestionAndAnswer(Number(params.id)),
  });

  return (
    <main className="flex flex-col items-center justify-center gap-10 mt-28">
      <div className=" flex w-[1000px] h-[500px] shadow-md bg-white rounded-2xl">
        <div className="w-1/2 h-full ">
          <CirclePacking userSeq={Number(params.id)} />
        </div>
        <div className="w-1/2 h-full ">
          <Line userSeq={Number(params.id)} />
        </div>
      </div>
      <div className=" flex w-[1000px] h-[1000px] flex-wrap shadow-md bg-white rounded-2xl">
        <div className="w-1/2 h-1/2">
          <Calendar userSeq={Number(params.id)} />
        </div>
        <div className="w-1/2 h-1/2">
          <p>해결 트러블 슈팅 수{data?.data.solvedCount}</p>
          <p>미해결 트러블 슈팅 수{data?.data.notSolvedCount}</p>
        </div>
        <div className="w-1/2 h-1/2">
          <Pie userSeq={Number(params.id)} />
        </div>
        <div className="w-1/2 h-1/2">
          <Area userSeq={Number(params.id)} />
        </div>
      </div>
      <div className=" flex w-[1000px] h-[1000px] flex-wrap shadow-md bg-white rounded-2xl">
        <div className="w-full h-1/2 ">
          <p>질문 수 : {data2?.data.troubleCount}</p>
          <p>답변 수 : {data2?.data.answerCount}</p>
          <p>채택 된 답변 수 : {data2?.data.selectAnswerCount}</p>
          <p>채택 률 : {data2?.data.selectedRate}</p>
        </div>
        <div className="w-1/2 h-1/2">
          <QuestionPie userSeq={Number(params.id)} />
        </div>
        <div className="w-1/2 h-1/2">
          <ResponsePie userSeq={Number(params.id)} />
        </div>
      </div>
    </main>
  );
}
