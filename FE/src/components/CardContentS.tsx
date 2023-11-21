import Link from "next/link";
import IconBox from "./IconBox";
import { GetTroubleList } from "@/types/TroubleType";
import { changeKoTime } from "@/utils/getTimeAgo";
import { AiFillTag } from "react-icons/ai";
interface Props {
  keyword: string;
  contents: GetTroubleList;
  queryKey?: string;
}

export default function CardContentS({ keyword, contents }: Props) {
  return (
    <div className="rounded-lg w-60 bg-white shadow-md">
      <div className="w-full h-7 px-2 font-semibold bg-main rounded-t-lg flex items-center justify-between">
        <p>{keyword}</p>
        <Link href={"/trouble"}>
          <p>전체보기 {">"} </p>
        </Link>
      </div>
      <div className="flex flex-col items-center p-2">
        {contents.troubleShootingList.map((content, idx) => (
          <div className={`mt-2 w-[95%] ${idx != 2 && "border-b-2"}`} key={idx}>
            <Link href={`/trouble/${content.seq}`}>
              <div className=" flex items-center justify-between">
                <p className="flex justify-center items-center bg-blue-500 text-white w-6 h-6 rounded-lg me-2">
                  {idx + 1}
                </p>
                <p className="text-base font-semibold flex-1 me-13 line-clamp-1">{content.title}</p>
                <p className="text-xs">{changeKoTime(content.createTime)}</p>
              </div>
              <div className={`line-clamp-2 text-sm ${content.tags.length > 0 ? "my-3" : "mt-3 mb-2"}`}>
                {content.context}
              </div>
              {content.tags && content.tags.length > 0 && (
                <div className="tagbox">
                  <div className="flex items-center gap-2 line-clamp-1 tag-scroll overflow-scroll">
                    <div className="me-1">
                      <AiFillTag />
                    </div>
                    {content.tags.map((tag, idx) => (
                      <div key={idx} className="bg-silver rounded-lg text-xs shadow-sm text-center p-1 mt-1">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="cover-bar"></div>
                </div>
              )}
              {/* <div className="text-sm">
                <IconBox likes={content.likeCount} views={content.viewCount} comments={content.replyCount} />
              </div> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
