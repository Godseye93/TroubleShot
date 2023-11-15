"use client";
import { getTrouble } from "@/api/trouble";
import CardContent from "@/components/CardContentS";
import IconBox from "@/components/IconBox";
import { useLoginStore } from "@/stores/useLoginStore";
import { changeKoTime } from "@/utils/getTimeAgo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Rsidebar({ userSeq }: { userSeq: number }) {
  const path = usePathname();
  const { user } = useLoginStore();
  const { data } = useQuery({
    queryKey: ["recentlyOther"],
    queryFn: async () => {
      const data = await getTrouble({ pageSize: 3, loginSeq: user?.member.seq, writerSeq: userSeq });
      return data;
    },
    enabled: !!user,
  });
  return (
    <div className={`mt-4 ${!path.includes("create") && !path.includes("update") && "lg:block"} hidden`}>
      {data && (
        <div className="rounded-lg w-60 bg-white shadow-md">
          <div className="w-full h-7 px-2 bg-main rounded-t-lg flex items-center justify-between">
            <p>최근글</p>
            <Link href={`/others/${userSeq}`}>
              <p>전체보기 {">"} </p>
            </Link>
          </div>
          <div className="flex flex-col items-center p-2">
            {data.troubleShootingList.map((content, idx) => (
              <div className={`mt-2 w-[95%] ${idx != 2 && "border-b-2"}`} key={idx}>
                <Link href={`/trouble/${content.seq}`}>
                  <div className=" flex items-center justify-between">
                    <p className="text-base font-semibold flex-1 me-13 line-clamp-1">
                      {idx + 1}. {content.title}
                    </p>
                    <p className="text-xs">{changeKoTime(content.createTime)}</p>
                  </div>
                  <div className="line-clamp-2 mt-2 text-sm">{content.context}</div>
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
                    <IconBox likes={content.likeCount} views={content.viewCount} comments={content.replyCount} />
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
