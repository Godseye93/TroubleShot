import { getUsedLotTags } from "@/api/account";
import { useState, useEffect } from "react";

interface Params {
  userSeq: number;
}
export default function UsedLotTags(params: Params) {
  const { userSeq } = params;
  const requestMostUsedTagDTO = {
    userSeq: userSeq!,
    count: 6,
  };

  const [tags, setTags] = useState<string[] | null>(null);

  const getTags = async () => {
    try {
      const data = await getUsedLotTags(requestMostUsedTagDTO);
      setTags(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      {tags?.length ? (
        tags?.map((tag, i) => (
          <div key={i} className="mb-4 w-1/2">
            <div className="w-11/12 bg-gray-300 rounded-lg fcc shadow-sm line-clamp-1">
              <p className="text-lg my-1">{tag}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-1/2 py-2">사용한 태그가 없습니다.</div>
      )}
    </>
  );
}
