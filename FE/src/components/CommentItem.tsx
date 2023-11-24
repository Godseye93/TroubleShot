import { Reply } from "@/types/TroubleType";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CommentMenu from "./CommentMenu";
import { useEffect, useState } from "react";
import { postLikeAnswerComment, postLikeComment, putAnswerComment, putComment } from "@/api/trouble";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { checkWriterImg, checkWriterName } from "@/utils/nullWriter";
import Link from "next/link";

export default function CommentItem({
  comment,
  userSeq,
  troubleSeq,
  answerSeq,
}: {
  comment: Reply;
  userSeq?: number;
  troubleSeq: number;
  answerSeq?: number;
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [putCommentValue, setPutCommentValue] = useState(comment.context);
  const toggleShowCreate = () => {
    setIsUpdate((prev) => !prev);
    setPutCommentValue(comment.context);
  };
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    if (!userSeq) return toast.error("로그인이 필요합니다");
    if (!answerSeq) {
      try {
        await putComment(userSeq ?? 0, troubleSeq, putCommentValue, comment.seq);
        toast.success("수정되었습니다");
        queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
        setIsUpdate(false);
      } catch (err) {
        console.log(err);
      }
    } else if (answerSeq) {
      try {
        await putAnswerComment(userSeq, troubleSeq, answerSeq, putCommentValue, comment.seq);
        queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
        setIsUpdate(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onLike = async () => {
    if (!userSeq) return toast.error("로그인이 필요합니다");
    try {
      if (!answerSeq) {
        await postLikeComment(userSeq, troubleSeq, comment.seq);
      } else if (answerSeq) {
        await postLikeAnswerComment(userSeq, troubleSeq, answerSeq, comment.seq);
      }
      queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setPutCommentValue(comment.context);
  }, [comment]);
  return (
    <div className="mt-3 pt-3 flex items-start gap-5">
      <div className="">
        <Link href={comment.writer ? `/mypage/${comment.writer.seq}` : ""}>
          <img src={checkWriterImg(comment.writer)} alt="" className="rounded-full w-12 h-12 mt-2" />
        </Link>
      </div>
      {!isUpdate ? (
        <div className="w-full">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <Link href={comment.writer ? `/mypage/${comment.writer.seq}` : ""}>
                <p className="font-semibold">{checkWriterName(comment.writer)}</p>
              </Link>
              <p className="text-slate-500 text-xs my-2">{getTimeAgo(comment.createTime)}</p>
            </div>
            {comment.writer && comment.writer.seq === userSeq && (
              <CommentMenu
                userSeq={userSeq}
                troubleSeq={troubleSeq}
                commentSeq={comment.seq}
                toggleShowCreate={toggleShowCreate}
                answerSeq={answerSeq}
              />
            )}
          </div>
          <div className="my-2">{comment.context}</div>
          <div
            className="flex items-center gap-1 hover:cursor-pointer max-w-[3rem] border-sub text-sub rounded-lg px-2 border"
            onClick={onLike}
          >
            {comment.loginLike ? (
              <div className="w-4 text-red-600 hover:text-red-400 transition-colors duration-200">
                <AiFillHeart />
              </div>
            ) : (
              <div className="w-4 hover:text-red-400 transition-colors duration-200">
                <AiOutlineHeart />
              </div>
            )}
            <p className=" line-clamp-1 items-center ">{comment.likeCount}</p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <textarea
            className="border w-full rounded-lg h-[10rem] resize-none p-3"
            placeholder="댓글을 입력해 주세요"
            onChange={(e) => setPutCommentValue(e.target.value)}
            defaultValue={putCommentValue}
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
      )}
    </div>
  );
}
