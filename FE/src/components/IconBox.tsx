import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";

interface props {
  likes: number;
  views: number;
  comments: number;
  m?: string;
}

export default function IconBox({ likes, views, comments, m }: props) {
  return (
    <div className="flex  items-center gap-1">
      <div className="flex items-center max-w-[33%]">
        <div className={`w-4 ${m && m}`}>
          <AiOutlineHeart />
        </div>
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
