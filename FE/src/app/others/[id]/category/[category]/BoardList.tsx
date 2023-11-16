"use client";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import React, { useEffect, useState } from "react";
import useInfiniteList from "@/hooks/useInfiniteList";
import { useParams, useSearchParams } from "next/navigation";
export default function BoardList({ name }: { name: string }) {
  const { user } = useLoginStore();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const solved = searchParams.get("solved");
  const params = useParams();
  const tags = searchParams
    .get("tags")
    ?.split(",")
    .filter((tag) => !(tag.trim() === ""));
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const order = Number(searchParams.get("order"));
  const [options, setOptions] = useState<SearchParams>({
    ...(keyword && { keyword }),
    ...(solved !== null && { solved: solved === "true" ? true : false }),
    ...(tags && { tags }),
    ...(startTime && { startTime }),
    ...(endTime && { endTime }),
    ...(order && { order }),
  });
  useEffect(() => {
    setOptions({
      ...(keyword && { keyword: keyword }),
      ...(solved !== null && { solved: solved === "true" ? true : false }),
      ...(tags && { tags }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(order && { order }),
    });
  }, [searchParams.toString()]);

  const { data } = useInfiniteList({
    options: options,
    queryKey: "others",
    category: params.category as string,
    userSeq: Number(params.id),
  });

  return (
    <>
      <Searchbar
        setPropsOptions={setOptions}
        PropsOptions={options}
        baseUrl={`/others/${Number(params.id)}/category/${name}`}
        queryKey="others"
      />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data && data.pages[0].totalCount > 0 ? (
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.troubleShootingList.map((content, idx) => (
                <BoardItem
                  nowUrl={`/others/${Number(params.id)}/category/${name}`}
                  key={idx}
                  board={content}
                  idx={idx}
                  last={page.troubleShootingList.length - 1}
                  queryKey={["others", options]}
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
