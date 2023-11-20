"use client";
import { getTrouble } from "@/api/trouble";
import CardContent from "@/components/CardContentS";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function Rsidebar() {
  const path = usePathname();
  const title = "최근글";
  const { user } = useLoginStore();
  const { data } = useQuery({
    queryKey: ["recently"],
    queryFn: async () => {
      const data = await getTrouble({ pageSize: 3, loginSeq: user?.member.seq, writerSeq: user?.member.seq });
      return data;
    },
    enabled: !!user,
  });
  return (
    <div className={`mt-4 ${!path.includes("create") && !path.includes("update") && "lg:block"} hidden`}>
      {data && <CardContent keyword={title} contents={data} />}
    </div>
  );
}
