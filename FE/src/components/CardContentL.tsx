"use client";
import Link from "next/link";
import { AiFillTag } from "react-icons/ai";
import { GetTroubleList, SearchParams, TroubleShootingBoard } from "@/types/TroubleType";
import { getImageLink } from "@/utils/getImageLink";

interface Props {
  keyword: string;
  contents?: TroubleShootingBoard[];
  queryKey: [string, SearchParams?];
}
export default function CardContentL({ keyword, contents, queryKey }: Props) {
  return (
    <div className="rounded-lg  bg-white shadow-md  self-start">
      <div className="w-full bg-main rounded-t-lg text-start px-3 py-2 font-semibold text-lg flex justify-between items-center">
        {keyword}

        <Link href={`/community/posts?tags=${keyword}`}>
          <p>전체보기 {">"} </p>
        </Link>
      </div>
      {contents && (
        <div className="flex flex-col items-center px-4 w-full">
          {contents.map((content, idx) => (
            <div className={`mt-3 w-full flex ${idx !== contents.length - 1 && "border-b-2"} w-full `} key={idx}>
              <div className={content.context && getImageLink(content.context).length > 0 ? "w-2/3 me-2" : "w-full"}>
                <div className=" flex items-center justify-between me-1">
                  <div className="text-base font-semibold flex-1 flex items-center pe-2">
                    <div className="flex justify-center items-center bg-blue-500 text-white w-8 h-8 rounded-lg me-2">
                      {idx + 1}
                    </div>
                    <p className="flex-1 line-clamp-1">{content.title}</p>
                  </div>
                  <p className="text-xs">{(content.createTime || "").split("T")[0]}</p>
                </div>
                <Link href={`/community/posts/${content.seq}`} key={idx}>
                  <div className="line-clamp-2 my-5 text-sm w-full hover:bg-silver rounded-lg transition-colors ">
                    {content.context}
                  </div>
                  {content.tags.length > 0 && (
                    <div className="tagbox mt-2">
                      <div className="flex gap-2 line-clamp-1 tag-scroll overflow-scroll items-center">
                        <div className="pt-1">
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
                </Link>
                {/* <div className="mt-3 mb-2 text-sm">
                  <IconBox
                    queryKey={queryKey}
                    likes={content.likeCount}
                    views={content.viewCount}
                    comments={content.replyCount}
                  />
                </div> */}
              </div>
              {content.context && getImageLink(content.context).length > 0 && (
                <div className="flex items-center w-1/3 h-full">
                  <img
                    className="rounded-md"
                    src={getImageLink(content.context)[0]}
                    alt="이미지가 준비되지 않았습니다"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
