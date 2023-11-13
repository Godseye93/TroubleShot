import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import PostList from "./PostList";
import { getTrouble } from "@/api/trouble";

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["postList"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getTrouble({ pageNo: pageParam });
      return data;
    },
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostList />
    </HydrationBoundary>
  );
}
