import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import BoardList from "./BoardList";
import { getTrouble } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
export default async function HydratedPosts() {
  const { user } = useLoginStore();
  const queryClient = getQueryClient();
  const options = {
    loginSeq: user?.member.seq,
    troubleShooting: {},
  };
  await queryClient.prefetchQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await getTrouble();
      return data;
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BoardList />
    </HydrationBoundary>
  );
}
