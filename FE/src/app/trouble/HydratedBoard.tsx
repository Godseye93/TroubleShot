import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";
import BoardList from "./BoardList";
import { getTrouble } from "@/api/trouble";

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["boards"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getTrouble({ pageNo: pageParam });
      return data;
    },
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BoardList />
    </HydrationBoundary>
  );
}
