"use client";

import { postAnswerComment, postComment } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

export default function CreateComment({
  troubleSeq,
  answerSeq,
  setShowCreateAnswer,
}: {
  troubleSeq: number;
  answerSeq?: number;
  setShowCreateAnswer?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();
  const { user } = useLoginStore();
  const queryClient = useQueryClient();
  const toggleShowCreate = async () => {
    if (!user) {
      router.push("/login");
      await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기 작업을 기다림
      toast.warn("로그인이 필요합니다");
      return;
    }
    if (setShowCreateAnswer) {
      setShowCreateAnswer((prev) => !prev);
      return;
    }
    if (!answerSeq) setShowCreate((prev) => !prev);
  };
  const [comment, setComment] = useState("");
  const onSubmit = async () => {
    if (!user) {
      router.push("/login");
      await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기 작업을 기다림
      toast.warn("로그인이 필요합니다");
      return;
    }
    if (comment.trim() === "") return toast.error("댓글을 입력해 주세요");
    if (!answerSeq) {
      try {
        await postComment(user!.member.seq, troubleSeq, comment);
        queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
        toast.success("댓글이 등록되었습니다.");
        setShowCreate(false);
        setComment("");
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    } else if (answerSeq) {
      try {
        await postAnswerComment(user.member.seq, troubleSeq, answerSeq, comment);
        queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
        toast.success("댓글이 등록되었습니다.");

        setShowCreateAnswer!(false);
        setComment("");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="border-t-2 mt-3 pt-3">
      <div className={`flex gap-3 ${showCreate || answerSeq ? "items-start" : "items-center"}`}>
        {user && <img src={user.member.profileImg} alt="" className="w-12 h-12 rounded-full" />}
        {showCreate || answerSeq ? (
          <>
            <div className="w-full ">
              <textarea
                className="border w-full rounded-lg h-[10rem] resize-none p-3 waterfall"
                placeholder="댓글을 입력해 주세요"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  className="rounded-lg bg-sub text-white shadow-md py-1 px-2 hover:shadow-sm hover:bg-pink-700 transition-all duration-200"
                  onClick={toggleShowCreate}
                >
                  닫기
                </button>
                <button
                  className="rounded-lg bg-main shadow-md py-1 px-2 hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
                  onClick={onSubmit}
                >
                  등록
                </button>
              </div>
            </div>
          </>
        ) : (
          <div
            className="h-16 w-full  hover:cursor-text border-black border rounded-lg border-opacity-50 p-3 flex items-center"
            onClick={toggleShowCreate}
          >
            댓글을 남겨보세요!
          </div>
        )}
      </div>
    </div>
  );
}
