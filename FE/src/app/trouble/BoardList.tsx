"use client";
import { getTrouble } from "@/api/trouble";
import BoardItem from "@/components/BoardItem";
import { useQuery } from "@tanstack/react-query";

export default function BoardList() {
  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await getTrouble();
      return data;
    },
  });

  return (
    <div className="mt-2">
      <div className="bg-white rounded-lg shadow-md px-2">
        {data &&
          data.troubleShootingList.map((content, idx) => (
            <BoardItem key={idx} board={content} idx={idx} last={data.troubleShootingList.length - 1} />
          ))}
      </div>
    </div>
  );
}
