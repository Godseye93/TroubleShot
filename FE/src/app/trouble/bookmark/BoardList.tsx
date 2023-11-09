"use client";
import { getTrouble } from "@/api/trouble";
import getQueryClient from "@/app/getQueryClient";
import BoardItem from "@/components/BoardItem";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import { useQuery } from "@tanstack/react-query";

export default function BoardList() {
  const { user } = useLoginStore();
  const queryClient = getQueryClient();
  const options: SearchParams = {
    loginSeq: user?.member.seq,
    favorite: true,
    writerSeq: user?.member.seq,
  };
  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await getTrouble(options);
      return data;
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md px-2 mt-2 flex-col items-center">
      {data &&
        data.troubleShootingList.map((content, idx) => (
          <BoardItem key={idx} board={content} idx={idx} last={data.troubleShootingList.length - 1} />
        ))}
    </div>
  );
}
