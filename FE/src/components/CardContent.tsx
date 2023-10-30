import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { MdComment } from "react-icons/md";
interface content {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
}
interface props {
  keyword: string;
  contents: content[];
}

export default function CardContent({ keyword, contents }: props) {
  return (
    <div className="rounded-lg w-56 bg-white shadow-md">
      <div className="w-full h-7 bg-main rounded-t-lg text-center">{keyword}</div>
      <div className="flex flex-col items-center p-2">
        {contents.map((content, idx) => (
          <div className="mt-2 w-[95%] border-b-2 " key={idx}>
            <p className="text-base font-semibold">
              {idx + 1}. {content.title}
            </p>
            <div className="line-clamp-2 mt-2 text-sm">{content.content}</div>
            <div className="tagbox">
              <div className="flex gap-2 line-clamp-1 tag-scroll overflow-scroll">
                {content.tags.map((tag) => (
                  <div className="bg-silver rounded-lg text-xs shadow-sm text-center p-1 mt-1">{tag}</div>
                ))}
              </div>
              <div className="cover-bar"></div>
            </div>
            <div className="flex text-sm items-center gap-1">
              <div className="flex items-center max-w-[33%]">
                <div className="w-4">
                  <AiOutlineHeart />
                </div>
                <p className=" line-clamp-1 items-center ">{content.likes}</p>
              </div>
              <div className="flex items-center max-w-[33%]">
                <div className="w-4">
                  <AiOutlineEye />
                </div>
                <p className="line-clamp-1 items-center">{content.likes}</p>
              </div>
              <div className="flex items-center max-w-[33%]">
                <div className="w-4">
                  <MdComment />
                </div>
                <p className=" line-clamp-1 items-center">{content.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
