import IconBox from "./IconBox";
import Link from "next/link";
import Tagbox from "./TagBox";
interface content {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
  img?: string;
  date: string;
}
interface props {
  keyword: string;
  contents: content[];
}

export default function CardContentL({ keyword, contents }: props) {
  return (
    <div className="rounded-lg w-full bg-white shadow-md">
      <div className="w-full bg-main rounded-t-lg text-start px-3 py-2 font-semibold text-lg flex justify-between items-center">
        {keyword}

        <Link href={""}>
          <p>전체보기 {">"} </p>
        </Link>
      </div>

      <div className="flex flex-col items-center px-2">
        {contents.map((content, idx) => (
          <div className={`mt-2 w-full flex ${idx !== contents.length - 1 && "border-b-2"} `} key={idx}>
            <div className="flex-1">
              <div className=" flex items-center justify-between me-1">
                <p className="text-base font-semibold">
                  {idx + 1}. {content.title}
                </p>
                <p className="text-xs">{content.date}</p>
              </div>
              <div className="line-clamp-2 mt-2 text-sm">{content.content}</div>

              <Tagbox tags={content.tags} />
              <div className="mt-3 mb-2 text-sm">
                <IconBox likes={content.likes} views={content.views} comments={content.comments} />
              </div>
            </div>
            {content.img && (
              <div className="flex items-center w-1/3 h-full mb-2">
                <img className="rounded-md" src={content.img} alt="이미지가 준비되지 않았습니다" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
