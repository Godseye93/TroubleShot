import { Reply } from "@/types/TroubleType";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentMenu from "./CommentMenu";

export default function CommentItem({
  comment,
  userSeq,
  troubleSeq,
}: {
  comment: Reply;
  userSeq?: number;
  troubleSeq: number;
}) {
  return (
    <div className="mt-3 pt-3 flex items-start gap-5">
      <div className="">
        <img src={comment.writer.profileImg} alt="" className="rounded-full w-12 h-12 mt-2" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{comment.writer.nickname}</p>
            <p className="text-slate-500 text-xs my-2">{getTimeAgo(comment.createTime)}</p>
          </div>
          {comment.writer.seq === userSeq && (
            <CommentMenu userSeq={userSeq} troubleSeq={troubleSeq} commentSeq={comment.seq} />
          )}
        </div>
        <div className="my-1">{comment.context}</div>
        <div className="flex items-center gap-1">
          {comment.loginLike ? (
            <div className="w-4 text-red-600">
              <AiFillHeart />
            </div>
          ) : (
            <div className="w-4 ">
              <AiOutlineHeart />
            </div>
          )}
          <p className=" line-clamp-1 items-center ">{comment.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
