import { getBookmark, getTrouble } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
  options: SearchParams;
  queryKey: string;
  category?: string;
  userSeq?: number;
}
export default function useInfiniteList({ options, queryKey, category, userSeq }: Props) {
  const { user } = useLoginStore();
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey, options],
    queryFn: async ({ pageParam = 1 }) => {
      const data =
        queryKey === "boards"
          ? await getTrouble({
              ...options,
              pageSize: 10,
              pageNo: pageParam,
              ...(user && { loginSeq: user.member.seq }),
            })
          : queryKey === "bookmark"
          ? await getBookmark({ ...options, pageSize: 10, pageNo: pageParam, loginSeq: user?.member.seq })
          : queryKey === "trouble"
          ? category
            ? await getTrouble({
                ...options,
                pageSize: 10,
                pageNo: pageParam,
                category,
                ...(user && { loginSeq: user.member.seq, writerSeq: user.member.seq }),
              })
            : await getTrouble({
                ...options,
                pageSize: 10,
                pageNo: pageParam,
                ...(user && { loginSeq: user.member.seq, writerSeq: user.member.seq }),
              })
          : queryKey === "others"
          ? category
            ? await getTrouble({
                ...options,
                pageSize: 10,
                pageNo: pageParam,
                ...(user && { loginSeq: user?.member.seq }),
                writerSeq: userSeq,
                category,
              })
            : await getTrouble({
                ...options,
                pageSize: 10,
                pageNo: pageParam,
                ...(user && { loginSeq: user?.member.seq }),
                writerSeq: userSeq,
              })
          : await getTrouble({ ...options, pageSize: 10, pageNo: pageParam });
      return data;
    },
    initialPageParam: 1,
    // 이건잘됨
    getNextPageParam: (lastPage, pages) => {
      return pages.length < Math.ceil(lastPage.totalCount / 10) ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    let fetching = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
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

  return { data };
}
