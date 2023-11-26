"use client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import { getSearchUser } from "@/api/account";
import UserList from "./UserList";

export default async function HydratedUserList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["userList", ""],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getSearchUser({ pageNo: pageParam, pageSize: 56, nickname: "" });
      return data;
    },
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserList />
    </HydrationBoundary>
  );
}
