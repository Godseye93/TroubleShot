"use client";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import React, { useState } from "react";
import useInfiniteList from "@/hooks/useInfiniteList";
export default function BoardList() {
  const { user } = useLoginStore();
  const [options, setOptions] = useState<SearchParams>({
    ...(user && { loginSeq: user.member.seq }),
    favorite: true,
  });

  const { data } = useInfiniteList(options, "bookmark");
  return (
    <>
      <Searchbar setPropsOptions={setOptions} />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.troubleShootingList.map((content, idx) => (
                <BoardItem
                  nowUrl="trouble/bookmark"
                  key={idx}
                  board={content}
                  idx={idx}
                  last={page.troubleShootingList.length - 1}
                  queryKey="bookmark"
                />
              ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
