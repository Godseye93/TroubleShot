"use client";
import ScrollTop from "@/components/ScrollTop";
import { useLoginStore } from "@/stores/useLoginStore";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const Profilebar = dynamic(() => import("./Profilebar"), {
  loading: () => <p> Loading...,</p>,
});
const UseSidebar = dynamic(() => import("./UseSidebar"), {
  loading: () => <p> Loading...,</p>,
});
const Rsidebar = dynamic(() => import("./Rsidebar"), {
  loading: () => <p> Loading...,</p>,
});
export default function Layout({ children }: Props) {
  const params = useParams();
  const userSeq = Number(params.id);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  });

  return (
    <>
      {mounted && (
        <>
          <div className="h-12"></div>
          <div className="px-2 flex justify-between w-full">
            <UseSidebar userSeq={userSeq} />
            {children}
            <div>
              <Profilebar userSeq={userSeq} />
              <Rsidebar userSeq={userSeq} />
            </div>

            <ScrollTop />
          </div>
        </>
      )}
    </>
  );
}
