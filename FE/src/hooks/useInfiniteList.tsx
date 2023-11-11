import { getTrouble } from "@/api/trouble";
import { SearchParams } from "@/types/TroubleType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useInfiniteList(options: SearchParams) {
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["boards"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getTrouble({ ...options, pageSize: 10, pageNo: pageParam });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });
  const totalPage = Math.ceil(data ? data.pages[0].totalCount / 10 : 1);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (data && data.pageParams.length < totalPage) {
          console.log(data);
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
