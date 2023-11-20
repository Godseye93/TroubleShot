"use client";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import React, { useEffect, useState } from "react";
import useInfiniteList from "@/hooks/useInfiniteList";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import boxloading from "../../../../public/boxloading.gif";
export default function PostList() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const writer = searchParams.get("writer");
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
    ...(writer && { keyword: writer }),
    ...(solved !== null && { solved: solved === "true" ? true : false }),
    ...(tags && { tags }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
    ...(order && { order }),
  });
  const { data, hasNextPage } = useInfiniteList({ options: options, queryKey: "boards" });

  return (
    <>
      <Searchbar
        PropsOptions={options}
        isCommunity={true}
        baseUrl="community/posts"
        queryKey="boards"
        setPropsOptions={setOptions}
      />
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
                  queryKey={["boards", options]}
                />
              ))}
            </React.Fragment>
          ))}
        {hasNextPage && (
          <div className="flex justify-center items-center">
            <Image alt="loading..." src={boxloading} width={100} height={100} />
          </div>
        )}
      </div>
    </>
  );
}
