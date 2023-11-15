"use client";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import React, { useEffect, useState } from "react";
import useInfiniteList from "@/hooks/useInfiniteList";
import { useSearchParams } from "next/navigation";
export default function BoardList() {
  const { user } = useLoginStore();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const solved = searchParams.get("solved");
  const tags = searchParams
    .get("tags")
    ?.split(",")
    .filter((tag) => !(tag.trim() === ""));
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const order = Number(searchParams.get("order"));
  const [options, setOptions] = useState<SearchParams>({
    ...(keyword && { keyword }),
    ...(solved !== null && { solved: Boolean(solved) }),
    ...(tags && { tags }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
    ...(order && { order }),
  });
  useEffect(() => {
    setOptions({
      ...(keyword && { keyword: keyword }),
      ...(solved !== null && { solved: Boolean(solved) }),
      ...(tags && { tags }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(order && { order }),
    });
    console.log(options);
  }, [searchParams.toString()]);

  const { data } = useInfiniteList({ options: options, queryKey: "bookmark" });

  return (
    <>
      <Searchbar setPropsOptions={setOptions} PropsOptions={options} baseUrl="trouble/bookmark" queryKey="bookmark" />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data && data.pages[0].totalCount > 0 ? (
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.troubleShootingList.map((content, idx) => (
                <BoardItem
                  nowUrl="trouble/bookmark"
                  key={idx}
                  board={content}
                  idx={idx}
                  last={page.troubleShootingList.length - 1}
                  queryKey={["bookmark", options]}
                />
              ))}
            </React.Fragment>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-[90vh] text-2xl font-semibold">
            아직 등록된 글이 없어요!
          </div>
        )}
      </div>
    </>
  );
}
