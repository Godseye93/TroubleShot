"use client";
import { useLoginStore } from "@/stores/useLoginStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useLoginStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  });
  return (
    <div className="rounded-lg w-60 h-72 bg-white shadow-md mt-4 lg:block hidden">
      {mounted && user && (
        <>
          <div
            className="hover:cursor-pointer hover:bg-softmain duration-200 transition-colors rounded-lg"
            onClick={() => router.push(`/mypage/${user.member.seq}`)}
          >
            <div className="fcc">
              <Image
                src={user.member.profileImg}
                alt=""
                className="rounded-full h-36 w-36  mt-5"
                width={500}
                height={500}
              />
            </div>
            <div className="text-center font-semibold line-clamp-1 mt-5 pb-2">{user.member.nickname}</div>
          </div>
          <div className="py-3 mx-3 border-t-2 text-center font-semibold line-clamp-1">{user.member.email}</div>
        </>
      )}
    </div>
  );
}
