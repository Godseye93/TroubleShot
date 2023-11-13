"use client";

import { postAnswerLike, putAnswer } from "@/api/trouble";
import CommentItem from "@/components/CommentItem";
import CreateComment from "@/components/CreateComment";
import { useLoginStore } from "@/stores/useLoginStore";
import { Answer } from "@/types/TroubleType";
import { changeKoTime } from "@/utils/getTimeAgo";
import { useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";
import BoardMenu from "./BoardMenu";
import UiwEditor from "@/components/Create/UiwEditor";

export default function AnswerPost({ answer, troubleSeq }: { answer: Answer; troubleSeq: number }) {
  const [showCreateAnswers, setShowCreateAnswer] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(answer.title);
  const [updateMD, setUpdateMD] = useState(answer.context);
  const queryClient = useQueryClient();
  const { user } = useLoginStore();
  const onLike = async () => {
    if (!user) return toast.error("로그인이 필요합니다.");
    try {
      await postAnswerLike(user.member.seq, troubleSeq, answer.seq);
      queryClient.invalidateQueries({
        queryKey: ["detail"],
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onUpdate = async () => {
    try {
      await putAnswer(user!.member.seq, troubleSeq, updateMD, updateTitle, answer.seq);
      toast.success("수정되었습니다");
      queryClient.invalidateQueries({
        queryKey: ["detail"],
        exact: true,
      });
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
      toast.error("수정에 실패했습니다");
    }
  };

  return (
    <div>
      {answer && (
        <>
          <div className="flex-1 bg-white rounded-lg shadow-md  mt-5">
            <div className="bg-slate-200 rounded-t-md px-5 pt-5">
              <div className="flex items-center">
                <div className="w-full line-clamp-1 text-xl font-semibold mt-5">
                  <span className="text-2xl text-amber-600 me-2"> Answer </span> {answer.title}
                </div>
                <div className="text-2xl">
                  {user?.member.seq === answer.writer.seq && (
                    <BoardMenu
                      userSeq={user.member.seq}
                      troubleSeq={troubleSeq}
                      answerSeq={answer.seq}
                      setShowUpdate={setShowUpdate}
                    />
                  )}
                </div>
              </div>
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
              {showUpdate ? (
                <div className="">
                  <input
                    type="text"
                    defaultValue={updateTitle}
                    className="w-full text-xl font-semibold rounded-t-lg px-5 bg-slate-200 h-12 flex items-center"
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                  <UiwEditor markdown={updateMD} setMarkdown={setUpdateMD} />
                  <div className="flex gap-2 justify-end items-center mt-5">
                    <button
                      className="rounded-lg bg-sub text-white shadow-md p-2 hover:shadow-sm hover:bg-pink-700 transition-all duration-200 relative"
                      onClick={() => setShowUpdate(false)}
                    >
                      닫기
                    </button>

                    <button
                      className="rounded-lg bg-main shadow-md p-2 hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
                      onClick={onUpdate}
                    >
                      등록
                    </button>
                  </div>
                </div>
              ) : (
                <MDEditor.Markdown source={answer?.context} />
              )}
            </div>
            <div className=" border-b-2 pb-2 pt-10 px-5">
              <div className="flex  items-center gap-3 mt-2 text-lg">
                <div className="flex items-center max-w-[33%]  hover:cursor-pointer gap-2" onClick={onLike}>
                  {answer.loginLike ? (
                    <div className="w-4 text-red-600 hover:text-red-400 transition-colors duration-200">
                      <AiFillHeart />
                    </div>
                  ) : (
                    <div className="w-4  hover:text-red-400 transition-colors duration-200">
                      <AiOutlineHeart />
                    </div>
                  )}
                  <p className=" line-clamp-1 items-center ">{answer.likeCount}</p>
                </div>

                <div
                  className="flex items-center max-w-[33%] gap-2 hover:cursor-pointer hover:text-main duration-200 transition-colors"
                  onClick={() => setShowComments((prev) => !prev)}
                >
                  <div className="w-4 ">
                    <MdComment />
                  </div>
                  <p className=" line-clamp-1 items-center ">
                    {answer.replyCount}
                    {answer.replyCount > 0 && "개의 댓글 더보기"}
                  </p>
                </div>
              </div>
              <p
                className="font-semibold text-lg mt-5 hover:cursor-pointer inline-block hover:text-main duration-200 transition-colors w-"
                onClick={() => setShowCreateAnswer((prev) => !prev)}
              >
                댓글 달기
              </p>
              {showCreateAnswers && (
                <CreateComment
                  troubleSeq={troubleSeq}
                  answerSeq={answer.seq}
                  setShowCreateAnswer={setShowCreateAnswer}
                />
              )}
              {showComments && (
                <div className="mt-3 pt-3 border-t-2">
                  {answer.replies &&
                    answer.replies.map((comment, idx) => (
                      <CommentItem
                        key={idx}
                        comment={comment}
                        userSeq={user?.member.seq}
                        troubleSeq={troubleSeq}
                        answerSeq={answer.seq}
                      />
                    ))}
                  <div
                    className="mt-5 pt-5 border-t-2 flex justify-center items-start text-xl font-semibold w-full rounded-md hover:text-main hover:cursor-pointer duration-200 transition-colors"
                    onClick={() => setShowComments(false)}
                  >
                    닫기
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
