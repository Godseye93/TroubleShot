import { BsBookmarkStar } from "react-icons/bs";
import IconBox from "./IconBox";
import { TroubleShootingBoard } from "@/types/TroubleType";
import { removeHtmlAndMarkdownTags } from "@/utils/removeHtmlAndMarkdownTags";
import { getImageLink } from "@/utils/getImageLink";
export default function BoardItem({ board, last, idx }: { board: TroubleShootingBoard; last: number; idx: number }) {
  const imgList = getImageLink(board.context);
  console.log(imgList);
  return (
    <div className={`${idx !== last && "border-b-2"} py-3 w-full`}>
      {/* 상단바 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={board.writer.profileImg} className="rounded-full w-10 h-10 shadow-md" />
          <p className="mx-2 font-semibold">{board.writer.nickname}</p>
          <p className="text-xs">{board.createTime}</p>
        </div>
        <div className="text-center me-2">
          <button className="text-2xl hover:text-main transition-all hover:shadow-md duration-200">
            <BsBookmarkStar />
          </button>
          <p className="text-red-500">미해결</p>
        </div>
      </div>
      {/* 중단 */}
      <div className="text-lg font-semibold">{board.title}</div>
      <div className="flex items-center w-full">
        <div
          className={`text-sm text-start mt-2 flex-1 h-full ${imgList.length === 0 ? " line-clamp-2" : "line-clamp-6"}`}
        >
          {removeHtmlAndMarkdownTags(board.context)}
        </div>
        {imgList.length > 0 && (
          <div className="w-72">
            <img src={imgList[0]} className="rounded-lg" alt="" />
          </div>
        )}
      </div>
      <div className="mt-3 text-lg">
        <IconBox m={"me-1"} comments={board.replyCount} likes={board.likeCount} views={board.viewCount} />
      </div>
    </div>
  );
}
