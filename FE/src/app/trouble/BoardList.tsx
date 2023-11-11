"use client";
import { getTrouble } from "@/api/trouble";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function BoardList() {
  const { user } = useLoginStore();
  const [options, setOptions] = useState<SearchParams>({
    loginSeq: user?.member.seq,
    writerSeq: user?.member.seq,
  });
  // const { data, error } = useQuery({
  //   queryKey: ["boards"],
  //   queryFn: async () => {
  //     const data = await getTrouble(options);
  //     console.log(options);
  //     return data;
  //   },
  // });

  // const totalPage = Math.ceil(data?.totalCount ?? 1 / 10);
  const [page, setPage] = useState(1);
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["boards"],
    queryFn: async ({ pageParam = 1 }) => {
      console.log({ ...options, pageNo: pageParam });
      const data = await getTrouble({ ...options, pageNo: pageParam });
      console.log(options);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages && pages.length + 1,
  });
  console.log(error);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <Searchbar setPropsOptions={setOptions} />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.troubleShootingList.map((content, idx) => (
                <BoardItem key={idx} board={content} idx={idx} last={page.troubleShootingList.length - 1} />
              ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
