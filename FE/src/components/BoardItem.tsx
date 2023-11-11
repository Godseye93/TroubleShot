"use client";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import IconBox from "./IconBox";
import { TroubleShootingBoard } from "@/types/TroubleType";
import { removeHtmlAndMarkdownTags } from "@/utils/removeHtmlAndMarkdownTags";
import { getImageLink } from "@/utils/getImageLink";
import Tagbox from "./TagBox";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useLoginStore } from "@/stores/useLoginStore";
import { postTroubleFavorite } from "@/api/trouble";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function BoardItem({ board, last, idx }: { board: TroubleShootingBoard; last: number; idx: number }) {
  const imgList = getImageLink(board.context);
  const { user } = useLoginStore();
  const queryClient = useQueryClient();
  const onBookmark = async () => {
    if (!user) return toast.error("로그인이 필요합니다");
    try {
      await postTroubleFavorite(user.member.seq, board.seq);
      if (!board.favorite) toast.success("북마크에 저장되었습니다");
      else if (board.favorite) toast.success("북마크에서 제거되었습니다");
      queryClient.refetchQueries({
        queryKey: ["boards"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["hotBoard"],
        exact: true,
      });
      console.log(board.favorite);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`${idx !== last && "border-b-2"} py-3 mt-2 w-full flex justify-center`}>
      {/* 상단바 */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={board.writer.profileImg} className="rounded-full w-10 h-10 shadow-md" />
            <p className="mx-2 font-semibold">{board.writer.nickname}</p>
            <p className="text-xs">{getTimeAgo(board.createTime)}</p>
          </div>
          <div className="text-center me-2" onClick={onBookmark}>
            {!user || !board.favorite ? (
              <button className="text-2xl hover:text-main transition-all hover:shadow-md duration-200">
                <BsBookmarkStar />
              </button>
            ) : (
              <button className="text-2xl text-main transition-all hover:shadow-md duration-200 hover:text-sub">
                <BsBookmarkStarFill />
              </button>
            )}
            {board.solved ? <p className="text-blue-500">해결 완료</p> : <p className="text-red-500">미해결</p>}
          </div>
        </div>
        {/* 중단 */}
        <div className="text-lg font-semibold px-1">{board.title}</div>
        <div className="flex items-center justify-between">
          <div
            className={`text-sm text-start mt-2 h-full px-1 ${imgList.length === 0 ? "line-clamp-2" : "line-clamp-6"} `}
          >
            {removeHtmlAndMarkdownTags(board.context).slice(0, 1000)}
          </div>
          {imgList.length > 0 && (
            <div className="w-72">
              <img src={imgList[0]} className="rounded-lg" alt="" />
            </div>
          )}
        </div>
        {board.tags.length > 0 && <Tagbox tags={board.tags} />}
        <div className="mt-3 text-lg">
          <IconBox
            m={"me-1"}
            comments={board.replyCount}
            likes={board.likeCount}
            views={board.viewCount}
            isLike={board.loginLike}
            troubleSeq={board.seq}
          />
        </div>
      </div>
    </div>
  );
}
