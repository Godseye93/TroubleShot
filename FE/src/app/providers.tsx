"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren, useState } from "react";

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      // react-query 전역 설정
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
