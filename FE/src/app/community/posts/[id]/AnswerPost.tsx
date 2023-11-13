"use client";

import { postAnswerLike } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { Answer } from "@/types/TroubleType";
import { changeKoTime } from "@/utils/getTimeAgo";
import { useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";

export default function AnswerPost({ answer, troubleSeq }: { answer: Answer; troubleSeq: number }) {
  const queryClient = useQueryClient();
  const { user } = useLoginStore();
  const onLike = async () => {
    if (!user) return toast.error("로그인이 필요합니다.");
    try {
      const res = await postAnswerLike(user.member.seq, troubleSeq, answer.seq);
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ["detail"],
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(answer);
  return (
    <div>
      {answer && (
        <>
          <div className="flex-1 bg-white rounded-lg shadow-md  mt-5">
            <div className="bg-slate-200 rounded-t-md px-5 pt-5">
              <div className="w-full line-clamp-1 text-xl font-semibold mt-5">{answer.title}</div>
              <div className="flex gap-2 items-center mt-8 border-b-2 pb-5">
                <img
                  src={answer!.writer.profileImg}
                  className="rounded-full shadow-md w-12 h-12"
                  // height={40}
                  // width={40}
                  alt=""
                />
                <p className="font-semibold text-lg">{answer.writer.nickname}</p>
                <p className="text-sm">{changeKoTime(answer.createTime)}</p>
              </div>
            </div>
            <div className="mt-12 px-5">
              <MDEditor.Markdown source={answer?.context} />
            </div>
            <div className=" border-b-2 pb-2 pt-10 px-5">
              <div className="flex  items-center gap-3 mt-5 text-lg">
                <div className="flex items-center max-w-[33%]  hover:cursor-pointer gap-2" onClick={onLike}>
                  {answer.loginLike ? (
                    <div className="w-4 text-red-600">
                      <AiFillHeart />
                    </div>
                  ) : (
                    <div className="w-4 ">
                      <AiOutlineHeart />
                    </div>
                  )}
                  <p className=" line-clamp-1 items-center ">{answer.likeCount}</p>
                </div>

                <div className="flex items-center max-w-[33%] gap-2">
                  <div className="w-4 ">
                    <MdComment />
                  </div>
                  <p className=" line-clamp-1 items-center">{answer.replyCount}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
