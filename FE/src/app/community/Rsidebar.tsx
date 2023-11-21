"use client";

import Link from "next/link";
import IconBox from "../../components/IconBox";
import { changeKoTime } from "@/utils/getTimeAgo";
import { getTrouble } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { AiFillTag } from "react-icons/ai";

export default function Rsidebar() {
  const path = usePathname();
  const { user } = useLoginStore();
  const { data } = useQuery({
    queryKey: ["notSolved"],
    queryFn: async () => {
      const data = await getTrouble({ pageSize: 3, ...(user && { loginSeq: user.member.seq }), solved: false });
      return data;
    },
  });
  return (
    <div className={`mt-4 ${!path.includes("create") && !path.includes("update") && "lg:block"} hidden`}>
      {data && (
        <div className="rounded-lg w-60 bg-white shadow-md">
          <div className="w-full h-7 px-2 bg-main rounded-t-lg flex items-center justify-between">
            <p>미해결 인기글</p>
            <Link href={"/community/posts?solved=false"}>
              <p>전체보기 {">"} </p>
            </Link>
          </div>
          <div className="flex flex-col items-center p-2">
            {data.troubleShootingList.map((content, idx) => (
              <div className={`mt-2 w-[95%] ${idx != 2 && "border-b-2"}`} key={idx}>
                <Link href={`/community/posts/${content.seq}`}>
                  <div className="w-full flex items-center justify-between">
                    <p className="w-6 me-1 h-6 rounded-lg font-semibold flex justify-center items-center bg-blue-500 text-white">
                      {idx + 1}
                    </p>{" "}
                    {content.title.length < 12 ? content.title : content.title.slice(0, 12) + "..."}
                    <p className="text-base font-semibold flex-1 "></p>
                    <p className="text-xs">{changeKoTime(content.createTime)}</p>
                  </div>
                  <div className={`line-clamp-2 text-sm ${content.tags.length > 0 ? "my-5" : "mt-5 mb-2"}`}>
                    {content.context}
                  </div>

                  {content.tags && content.tags.length > 0 && (
                    <div className="tagbox">
                      <div className="flex items-center tag-scroll overflow-scroll relative">
                        <div className="me-1">
                          <AiFillTag />
                        </div>
                        {content.tags.map((tag, idx) => (
                          <div key={idx} className=" bg-silver rounded-lg  text-xs me-2 shadow-sm text-center p-1 mt-1">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="cover-bar"></div>
                    </div>
                  )}
                  <div className="text-sm">
                    {/* <IconBox likes={content.likeCount} views={content.viewCount} comments={content.replyCount} /> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
