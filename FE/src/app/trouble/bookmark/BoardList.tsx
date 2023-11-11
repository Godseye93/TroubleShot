"use client";
import { getTrouble } from "@/api/trouble";
import BoardItem from "@/components/BoardItem";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function BoardList() {
  const { user } = useLoginStore();
  const [options, setOptions] = useState<SearchParams>({
    loginSeq: user?.member.seq,
    favorite: true,
  });
  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await getTrouble(options);
      return data;
    },
  });

  return (
    <>
      <Searchbar setPropsOptions={setOptions} />
      <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
        {data &&
          data.troubleShootingList.map((content, idx) => (
            <BoardItem key={idx} board={content} idx={idx} last={data.troubleShootingList.length - 1} />
          ))}
      </div>
    </>
  );
}
