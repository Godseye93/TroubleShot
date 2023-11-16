"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { useRef } from "react";

import { TbRobot } from "react-icons/tb";

import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountAiAnswer, postAnswerAi } from "@/api/trouble";
import loadingImg from "../../../public/loading.gif";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";

export default function AnswerAi({ userSeq, context }: { userSeq: number; context: string }) {
  const [showAria, setShowAria] = useState(false);
  const queryClient = useQueryClient();

  const toggleShow = () => {
    setShowAria((prev) => !prev);
    if (data?.count === 0) return toast.error("일일 사용한도를 모두 사용하셨습니다");
    mutation.mutate();
    queryClient.invalidateQueries({ queryKey: ["CountAiAnswer", userSeq], exact: true });
  };
  const mutation = useMutation({
    mutationFn: () => {
      return postAnswerAi({ loginSeq: userSeq, context: context, type: 0 });
    },
  });
  const { data } = useQuery({
    queryKey: ["CountAiAnswer", userSeq],
    queryFn: () => getCountAiAnswer(userSeq),
  });
  useEffect(() => {
    if (mutation.isPending || mutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["CountAiAnswer", userSeq], exact: true });
    }
  }, [mutation.isPending, mutation.isSuccess]);
  return (
    <>
      <div className="flex text-xl items-center justify-between mt-10">
        <div className="flex text-xl items-center gap-2">
          <div className="text-3xl">
            <TbRobot />
          </div>
          <p>
            AI에게 답변을 요청해 보세요!{" "}
            {data && <span className="text-sm font-semibold">오늘 남은 횟수 : {data.count} / 10</span>}
          </p>
        </div>
        <button
          className={
            mutation.isSuccess
              ? "bg-slate-500 ms-5  px-2 text-base p-1 rounded-full text-white"
              : "hover:bg-amber-500 ms-5 px-2 text-base shadow-md hover:shadow-none bg-main transition-all duration-200 rounded-full p-1 hover:cursor-pointer"
          }
          onClick={toggleShow}
          disabled={mutation.isSuccess}
        >
          답변 요청하기
        </button>
      </div>
      {/* <button
        className={
          mutation.isSuccess
            ? "bg-slate-500 ms-9 mt-5 px-2 text-base p-1 rounded-full text-white"
            : "hover:bg-amber-500 ms-9 mt-5 px-2 text-base shadow-md hover:shadow-none bg-main transition-all duration-200 rounded-full p-1 hover:cursor-pointer"
        }
        onClick={toggleShow}
        disabled={mutation.isSuccess}
      >
        답변 요청하기
      </button> */}

      {showAria && (
        <div
          className={`border-black w-full  text-lg p-5 rounded-lg border mt-10 ${mutation.isPending && "bg-[#083142]"}`}
        >
          {mutation.isPending ? (
            <div className="flex justify-center items-center">
              <div>
                <Image src={loadingImg} alt="" width={300} height={300} />
                <p className="mt-5 text-center text-white font-semibold">로딩중입니다...(최대 50초)</p>
              </div>
            </div>
          ) : (
            <>
              {mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null}

              {mutation.isSuccess ? <MDEditor.Markdown source={mutation.data.context} /> : null}
            </>
          )}
        </div>
      )}
    </>
  );
}
