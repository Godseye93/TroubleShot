"use client";
import { getUserInfo } from "@/api/account";
import { useLoginStore } from "@/stores/useLoginStore";
import { checkWriterImg } from "@/utils/nullWriter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profilebar({ userSeq }: { userSeq: number }) {
  const { user } = useLoginStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { data } = useQuery({
    queryKey: ["nowUser"],
    queryFn: async () => {
      const data = await getUserInfo(userSeq);
      return data;
    },
  });
  useEffect(() => {
    setMounted(true);
  });
  return (
    <div
      className={`mt-4 ${
        !path.includes("create") && !path.includes("update") && "lg:block"
      } hidden rounded-lg w-60 h-72 bg-white shadow-md`}
    >
      {mounted && data && (
        <>
          <div
            className="hover:cursor-pointer hover:bg-softmain duration-200 transition-colors rounded-lg"
            onClick={() => router.push(`/mypage/${data.seq}`)}
          >
            <div className="fcc">
              <img
                src={checkWriterImg({ profileImg: data.profileImg })}
                alt=""
                className="rounded-full h-36 w-36  mt-5"
                width={500}
                height={500}
              />
            </div>
            <div className="text-center font-semibold line-clamp-1 mt-5 pb-2">{data.nickname ?? "(알수없음)"}</div>
          </div>
          <div className="py-3 mx-3 border-t-2 text-center font-semibold line-clamp-1">{data.email}</div>
        </>
      )}
    </div>
  );
}
