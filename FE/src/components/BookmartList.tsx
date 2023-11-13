import { getBookmarkList } from "@/api/account";
import { SearchParams, TroubleShootingBoard } from "@/types/TroubleType";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";

interface Params {
  userSeq: number;
}

export default function BookmartList(params: Params) {
  const { userSeq } = params;

  const [bookmarkList, setBookmarkList] = useState<TroubleShootingBoard[] | null>(null);

  const fetchData = async () => {
    const parmas: SearchParams = {
      loginSeq: userSeq,
      favorite: true,
    };
    try {
      const data = await getBookmarkList(parmas);
      setBookmarkList(data.troubleShootingList.slice(0, 4));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userSeq]);

  //   console.log(bookmarkList);

  return (
    <div className="w-full overflow-hidden">
      {bookmarkList ? (
        bookmarkList?.map((bookmark, i) => {
          return (
            <div key={i} className="w-full p-3 h-2/4 content-between border border-b-gray-300">
              <div className="text-xl mb-3 font-semibold">{bookmark.title}</div>
              <div className="flex w-3/4 mb-3">
                {bookmark.tags.map((v, i) => {
                  return (
                    <div key={i} className="bg-gray-300 rounded-lg me-2 w-[70px] min-w-fit text-center">
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex">
                <div className="flex items-center me-2">
                  <div className="flex w-4 text-red-600">
                    <AiFillHeart />
                  </div>
                  <p>{bookmark.likeCount}</p>
                </div>
                <div className="flex items-center me-2">
                  <div className="w-4">
                    <AiOutlineEye />
                  </div>
                  <p>{bookmark.viewCount}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4">
                    <MdComment />
                  </div>
                  <p>{bookmark.replyCount}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>등록한 북마크가 없습니다.</div>
      )}
    </div>
  );
}
