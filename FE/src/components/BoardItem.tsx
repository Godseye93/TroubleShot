import { BsBookmarkStar } from "react-icons/bs";
import IconBox from "./IconBox";

interface User {
  username: string;
  userImg: string;
}
interface Board {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
  img?: string;
  date: string;
  user: User;
}
export default function BoardItem({ board, last, idx }: { board: Board; last: number; idx: number }) {
  return (
    <div className={`${idx !== last && "border-b-2"} py-3`}>
      {/* 상단바 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={board.user.userImg} className="rounded-full w-10 h-10 shadow-md" />
          <p className="mx-2 font-semibold">{board.user.username}</p>
          <p className="text-xs">{board.date}</p>
        </div>
        <div className="text-center me-2">
          <button className="text-2xl hover:text-main transition-all hover:shadow-md duration-200">
            <BsBookmarkStar />
          </button>
          <p className="text-red-500">미해결</p>
        </div>
      </div>
      <div className="text-lg font-semibold">
        {/* 중단 */}
        {board.title}
      </div>
      <div className="sm:flex items-center">
        <div className={`text-sm text-start mt-2 flex-1 h-full ${!board.img ? " line-clamp-2" : "line-clamp-6"}`}>
          {board.content}
        </div>
        {board.img && (
          <div className="w-72">
            <img src={board.img} className="rounded-lg" alt="" />
          </div>
        )}
      </div>
      <div className="mt-3 text-lg">
        <IconBox m={"me-1"} comments={board.comments} likes={board.likes} views={board.views} />
      </div>
    </div>
  );
}
