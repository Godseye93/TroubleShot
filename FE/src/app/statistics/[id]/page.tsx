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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "@ramonak/react-progress-bar";

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
    <main className="flex flex-col items-center justify-center gap-10">
      <div className=" flex flex-col  shadow-md bg-white rounded-2xl p-5  w-[1200px] h-[550px]">
        <h1 className=" text-2xl font-semibold">내 태그 분석</h1>
        <div className=" flex">
          <div className="w-1/2 text-center font-semibold">
            <p>내가 사용한 태그</p>
          </div>
          <div className="w-1/2 text-center font-semibold">
            <p>최근 사용 태그들</p>
          </div>
        </div>
        <div className=" flex w-full">
          <div className="w-1/2 h-[400px] ">
            <CirclePacking userSeq={Number(params.id)} />
          </div>
          <div className="w-1/2 h-[400px] ">
            <Line userSeq={Number(params.id)} />
          </div>
        </div>
        <div className=" flex text-gray-400">
          <div className="w-1/2 text-center ">
            <p>내 트러블 슈팅 문서의 태그, 질문한 태그 등</p>
            <p>나와 관련된 태그들의 비율을 비교할 수 있습니다.</p>
          </div>
          <div className="w-1/2 text-center">
            <p>최근 5일간의 내 상위 태그 5개의 사용 횟수 현황을 보여줍니다.</p>
            <p>나와 관련된 태그들의 최근 현황을 확인해보세요.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col  shadow-md bg-white rounded-2xl p-5  w-[1200px] h-[1150px]">
        <h1 className=" text-2xl font-semibold mb-8">내 트러블 슈팅 문서 분석</h1>
        <div className=" flex flex-col w-full">
          <div className=" flex">
            <div className="w-3/5 text-center font-semibold">
              <p>나의 트러블 슈팅 활동</p>
            </div>
          </div>
          <div className=" flex">
            <div className="w-3/5 h-[380px]">
              <Calendar userSeq={Number(params.id)} />
            </div>
            <div className="w-2/5 h-[380px] flex flex-col justify-center items-center gap-10">
              <div className=" flex flex-col justify-center items-center">
                <div style={{ width: 200, height: 200 }}>
                  <CircularProgressbar
                    value={(data?.data.solvedCount / (data?.data.notSolvedCount + data?.data.solvedCount)) * 100}
                    text={`${(data?.data.solvedCount / (data?.data.notSolvedCount + data?.data.solvedCount)) * 100}%`}
                    styles={buildStyles({
                      textSize: "25px",
                    })}
                  />
                </div>
                <p className=" text-xl font-semibold mt-4">트러블 슈팅 해결률</p>
              </div>
              <div className=" flex flex-col justify-center items-center">
                <div className=" flex gap-2">
                  <p>해결 트러블 슈팅 수 </p>
                  <p className=" text-lime-600 text-xl font-semibold">{data?.data.solvedCount}</p>
                </div>
                <div className=" flex gap-2">
                  <p>미해결 트러블 슈팅 수 </p>
                  <p className=" text-rose-600 text-xl font-semibold">{data?.data.notSolvedCount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 text-center text-gray-400">
            <p>최근 5개월간 내 트러블 슈팅 문서 작성 활동을 한눈에 볼 수 있습니다.</p>
            <p>꾸준한 트러블 슈팅 문서 작성으로 잔디를 심어보세요.</p>
          </div>

          <div className=" mt-24">
            <div className=" flex">
              <div className="w-1/2 text-center font-semibold">
                <p>트러블 슈팅 작성 경로</p>
              </div>
              <div className="w-1/2 text-center font-semibold">
                <p>트러블 슈팅 작성 수 현황</p>
              </div>
            </div>
            <div className=" flex">
              <div className="w-1/2 h-[400px]">
                <Pie userSeq={Number(params.id)} />
              </div>
              <div className="w-1/2 h-[400px]">
                <Area userSeq={Number(params.id)} />
              </div>
            </div>
            <div className=" flex text-gray-400">
              <div className="w-1/2 text-center ">
                <p>트러블 슈팅을 어떤 경로로 작성했는지 비율을 보여줍니다.</p>
                <p>내가 많이 사용하는 경로를 확인해보세요.</p>
              </div>
              <div className="w-1/2 text-center">
                <p>이때까지 작성한 트러블 슈팅 문서 수를 누적하여 보여줍니다.</p>
                <p>얼마나 많은 트러블 슈팅을 작성해왔는지 확인해보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  shadow-md bg-white rounded-2xl p-5  w-[1200px] h-[900px]">
        <h1 className=" text-2xl font-semibold mb-8">내 커뮤니티 이용 분석</h1>
        <div className=" flex mb-10 justify-center items-center">
          <div className="flex flex-col gap-5 ">
            <div className=" flex gap-2 w-full items-center">
              <p>질문 수 </p>
              <ProgressBar
                completed={data2?.data.troubleCount.toString()}
                maxCompleted={Math.max(data2?.data.troubleCount, data2?.data.answerCount) * 1.2}
                width="600px"
                height="20px"
                bgColor="#41dc46"
                baseBgColor="#ffffff"
              />
            </div>
            <div className=" flex gap-2 w-full items-center">
              <p>답변 수 </p>
              <ProgressBar
                completed={data2?.data.answerCount.toString()}
                maxCompleted={Math.max(data2?.data.troubleCount, data2?.data.answerCount) * 1.2}
                width="600px"
                height="20px"
                bgColor="#41a8dc"
                baseBgColor="#ffffff"
              />
            </div>
            <div className="text-center w-full text-gray-400">
              <p>내가 커뮤니티에 얼마나 많은 답변과 질문을 했는지 보여줍니다.</p>
              <p>얼마나 많은 지식을 다른 사람들과 공유했는지 알아보세요.</p>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <div
              style={{
                width: 150,
                height: 150,
              }}
            >
              <CircularProgressbar
                value={data2?.data.selectedRate}
                text={`${data2?.data.selectedRate}%`}
                circleRatio={0.75} /* Make the circle only 0.75 of the full diameter */
                styles={{
                  trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-135deg)",
                    transformOrigin: "center center",
                  },
                }}
              />
            </div>
            <p className=" text-xl font-semibold mt-2 mb-5">내 답변 채택률</p>
            <p>채택 된 답변 수 : {data2?.data.selectedAnswerCount}</p>
          </div>
        </div>
        <div className=" flex font-semibold mt-10">
          <div className="w-1/2 text-center">
            <p>나의 질문 태그</p>
          </div>
          <div className="w-1/2 text-center">
            <p>나의 답변 태그</p>
          </div>
        </div>
        <div className=" flex">
          <div className="w-1/2 h-[400px]">
            <QuestionPie userSeq={Number(params.id)} />
          </div>
          <div className="w-1/2 h-[400px]">
            <ResponsePie userSeq={Number(params.id)} />
          </div>
        </div>
        <div className=" flex text-gray-400">
          <div className="w-1/2 text-center">
            <p>내가 질문한 태그들의 비율을 보여줍니다.</p>
            <p>내가 어떤 부분에 부족하고 많은 관심을 보이는지 알아보세요.</p>
          </div>
          <div className="w-1/2 text-center">
            <p>내가 답변한 태그들의 비율을 보여줍니다.</p>
            <p>내가 어떤 부분을 잘하고 자신이 있는지 알아보세요.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
