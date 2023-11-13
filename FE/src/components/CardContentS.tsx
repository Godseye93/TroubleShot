import Link from "next/link";
import IconBox from "./IconBox";
interface Content {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
  date: string;
}
interface Props {
  keyword: string;
  contents: Content[];
  queryKey?: string;
}

export default function CardContentS({ keyword, contents, queryKey }: Props) {
  return (
    <div className="rounded-lg w-52 bg-white shadow-md">
      <div className="w-full h-7 px-2 bg-main rounded-t-lg flex items-center justify-between">
        <p>{keyword}</p>
        <Link href={""}>
          <p>전체보기 {">"} </p>
        </Link>
      </div>
      <div className="flex flex-col items-center p-2">
        {contents.map((content, idx) => (
          <div className="mt-2 w-[95%] border-b-2 " key={idx}>
            <div className=" flex items-center justify-between">
              <p className="text-base font-semibold flex-1 me-13 line-clamp-1">
                {idx + 1}. {content.title}
              </p>
              <p className="text-xs">{content.date}</p>
            </div>
            <div className="line-clamp-2 mt-2 text-sm">{content.content}</div>
            <div className="tagbox">
              <div className="flex gap-2 line-clamp-1 tag-scroll overflow-scroll">
                {content.tags.map((tag, idx) => (
                  <div key={idx} className="bg-silver rounded-lg text-xs shadow-sm text-center p-1 mt-1">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="cover-bar"></div>
            </div>
            <div className="text-sm">
              <IconBox likes={content.likes} views={content.views} comments={content.comments} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
