"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import UserItem from "./UserItem";
import { getSearchUser } from "@/api/account";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import boxloading from "../../../../public/boxloading.gif";
export default function UserList() {
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState<string>(searchParams.get("nickname") ?? "");
  const [searchName, setSearchName] = useState(searchParams.get("nickname") ?? "");
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["userList", searchName],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getSearchUser({
        pageSize: 36,
        pageNo: pageParam,
        nickname: searchName,
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.memberList.length > 35 ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    let fetching = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && clientHeight * 1.5 + scrollTop >= scrollHeight) {
        fetching = true;
        if (hasNextPage) {
          await fetchNextPage();
        }
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
      <div className=" h-24 flex items-center border-black border-b-2 border-opacity-30">
        <div className="flex items-center justify-start w-full">
          <div className="relative  w-2/3 min-w-[10rem]">
            <div className="absolute left-4 top-[50%] -translate-y-[50%]">
              <BsSearch />
            </div>
            <input
              className=" w-full bg-silver rounded-full border-black border border-opacity-30 h-10 shadow-sm  ps-10"
              type="text"
              placeholder="유저를 검색해 주세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") setSearchName(nickname);
              }}
            />
          </div>
          <button
            onClick={() => setSearchName(nickname)}
            className=" hover:shadow-inner rounded-lg shadow-md hover:bg-main ms-5 flex justify-center transition-all duration-200 items-center w-12 bg-softmain h-10"
          >
            검색
          </button>
        </div>
      </div>
      <main className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.memberList.map((user, idx) => (
                <UserItem key={idx} user={user} />
              ))}
            </React.Fragment>
          ))}
      </main>
      {hasNextPage && (
        <div className="flex justify-center items-center mt-20">
          <Image alt="loading..." src={boxloading} width={100} height={100} />
        </div>
      )}
    </>
  );
}
