"use client";
import { postTroubleLike } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { SearchParams } from "@/types/TroubleType";
interface Props {
  likes: number;
  views: number;
  comments: number;
  m?: string;
  isLike?: boolean;
  troubleSeq?: number;
  queryKey?: [string, SearchParams?];
}

export default function IconBox({ likes, views, comments, m, isLike, troubleSeq, queryKey }: Props) {
  const queryClient = useQueryClient();
  // const queryClient = getQueryClient();
  const { user } = useLoginStore();
  const onLike = async () => {
    if (!queryKey) return;
    if (!troubleSeq) return;
    if (!user) return toast.error("로그인이 필요합니다.");
    try {
      const res = await postTroubleLike(user.member.seq, troubleSeq, user.member.seq);
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: queryKey,
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex  items-center gap-3 rounded-lg">
      <div
        className={`flex items-center border border-sub text-sub gap-2 rounded-lg px-2 ${
          queryKey && "hover:cursor-pointer"
        }`}
        onClick={onLike}
      >
        {isLike ? (
          <div className="w-4  text-red-600 hover:text-red-400 transition-colors duration-200">
            <AiFillHeart />
          </div>
        ) : (
          <div className="w-4 hover:text-red-400 transition-colors duration-200">
            <AiOutlineHeart />
          </div>
        )}
        <p className=" line-clamp-1 items-center ">{likes}</p>
      </div>
      <div className="flex items-center border border-green-600 rounded-lg px-2 gap-2 text-green-600">
        <div className="w-4">
          <AiOutlineEye />
        </div>
        <p className="line-clamp-1 items-center">{views}</p>
      </div>
      <div className="flex items-center border border-amber-600 text-amber-600 rounded-lg px-2 gap-2">
        <div className="w-4">
          <MdComment />
        </div>
        <p className=" line-clamp-1 items-center">{comments}</p>
      </div>
    </div>
  );
}
