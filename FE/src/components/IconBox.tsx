"use client";
import { postTroubleLike } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  likes: number;
  views: number;
  comments: number;
  m?: string;
  isLike?: boolean;
  troubleSeq?: number;
  queryKey?: string;
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
        queryKey: [queryKey],
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex  items-center gap-1">
      <div className={`flex items-center max-w-[33%] ${queryKey && "hover:cursor-pointer"}`} onClick={onLike}>
        {isLike ? (
          <div className={`w-4 ${m && m} text-red-600`}>
            <AiFillHeart />
          </div>
        ) : (
          <div className={`w-4 ${m && m}`}>
            <AiOutlineHeart />
          </div>
        )}
        <p className=" line-clamp-1 items-center ">{likes}</p>
      </div>
      <div className="flex items-center max-w-[33%]">
        <div className={`w-4 ${m && m}`}>
          <AiOutlineEye />
        </div>
        <p className="line-clamp-1 items-center">{views}</p>
      </div>
      <div className="flex items-center max-w-[33%]">
        <div className={`w-4 ${m && m}`}>
          <MdComment />
        </div>
        <p className=" line-clamp-1 items-center">{comments}</p>
      </div>
    </div>
  );
}
