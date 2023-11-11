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
    writerSeq: user?.member.seq,
  });
  const { data } = useInfiniteList(options);
  // const { data, error } = useQuery({
  //   queryKey: ["boards"],
  //   queryFn: async () => {
  //     const data = await getTrouble(options);
  //     console.log(options);
  //     return data;
  //   },
  // });

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
