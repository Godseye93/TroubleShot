import { useEffect } from "react";
import { getSearchUser } from "@/api/account";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteUserList({ nickname }: { nickname: string }) {
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["userList", nickname],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getSearchUser({
        pageSize: 12,
        pageNo: pageParam,
        nickname: nickname,
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
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
