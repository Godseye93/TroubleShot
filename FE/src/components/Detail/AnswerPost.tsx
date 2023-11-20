"use client";

import { postAnswerLike, putAnswer, putSelectAnswer } from "@/api/trouble";
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
import { checkWriterImg, checkWriterName } from "@/utils/nullWriter";
import { GiPin } from "react-icons/gi";
import Link from "next/link";
export default function AnswerPost({
  answer,
  troubleSeq,
  boardWriterSeq,
}: {
  answer: Answer;
  troubleSeq: number;
  boardWriterSeq: number | null;
}) {
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
  const onSelectAnswer = async () => {
    if (window.confirm("채택 후에는 취소가 불가능합니다. 정말 채택하시겠습니까?")) {
      try {
        await putSelectAnswer(user!.member.seq, troubleSeq, answer.seq);
        toast.success("답변이 채택되었습니다");
        queryClient.invalidateQueries({ queryKey: ["detail"], exact: true });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      {answer && (
        <>
          <div className="flex-1 bg-white rounded-lg shadow-md  mt-5">
            <div className={`${answer.selected ? "bg-softmain" : "bg-slate-200"} rounded-t-md px-5 pt-5`}>
              {answer.selected && (
                <div className="flex items-center gap-2 text-sub font-semibold">
                  <div>
                    <GiPin />
                  </div>
                  <p>채택된 답변입니다</p>
                </div>
              )}
              <div className="flex items-center">
                <div className="flex-1 line-clamp-1 text-xl font-semibold mt-5">
                  <span className="text-2xl text-amber-600 me-2"> Answer </span> {answer.title}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl flex justify-center">
                    {answer.writer && user?.member.seq === answer.writer.seq && (
                      <BoardMenu
                        userSeq={user.member.seq}
                        troubleSeq={troubleSeq}
                        answerSeq={answer.seq}
                        setShowUpdate={setShowUpdate}
                      />
                    )}
                  </div>
                  {boardWriterSeq === user?.member.seq &&
                    (!answer.selected ? (
                      <button
                        className="text-lg font-semibold py-1 px-3 rounded-full shadow-md bg-main"
                        onClick={onSelectAnswer}
                      >
                        채택하기
                      </button>
                    ) : (
                      <button disabled className="text-lg font-semibold py-1 px-3 rounded-full shadow-md bg-silver">
                        채택된 글
                      </button>
                    ))}
                </div>
              </div>
              <Link href={answer.writer ? `/mypage/${answer.writer.seq}` : ""}>
                <div className="flex gap-2 items-center mt-8 border-b-2 pb-5">
                  <img src={checkWriterImg(answer.writer)} className="rounded-full shadow-md w-12 h-12" alt="" />
                  <p className="font-semibold text-lg">{checkWriterName(answer.writer)}</p>
                  <p className="text-sm">{changeKoTime(answer.createTime)}</p>
                </div>
              </Link>
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
