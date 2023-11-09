import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";
import BoardList from "./BoardList";
import { getTrouble } from "@/api/trouble";

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await getTrouble();
      return data;
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydratedState}>
    <BoardList />
    // </HydrationBoundary>
  );
}
