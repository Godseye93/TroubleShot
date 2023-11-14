"use client";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import React, { useEffect, useState } from "react";
import useInfiniteList from "@/hooks/useInfiniteList";
import { useSearchParams } from "next/navigation";

export default function PostList() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const solved = Boolean(searchParams.get("solved"));
  const tags = searchParams
    .get("tags")
    ?.split(",")
    .filter((tag) => !(tag.trim() === ""));
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const order = Number(searchParams.get("order"));
  const [options, setOptions] = useState<SearchParams>({
    ...(keyword && { keyword }),
    ...(solved && { solved }),
    ...(tags && { tags }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
    ...(order && { order }),
  });
  const { data } = useInfiniteList({ options: options, queryKey: "boards" });
  // console.log(keyword, solved, tags, startTime, endTime, order);
  useEffect(() => {
    setOptions({
      ...(keyword && { keyword: keyword }),
      ...(solved ? { solved } : solved === false && { solved }),
      ...(tags && { tags }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(order && { order }),
    });
    console.log(searchParams.get("keyword"));
  }, [searchParams]);
  return (
    <>
      <Searchbar PropsOptions={options} isCommunity={true} baseUrl="/community/posts" queryKey="boards" />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.troubleShootingList.map((content, idx) => (
                <BoardItem
                  nowUrl="community/posts"
                  key={idx}
                  board={content}
                  idx={idx}
                  last={page.troubleShootingList.length - 1}
                  queryKey="postList"
                />
              ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
