"use client";
import ScrollTop from "@/components/ScrollTop";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import RsidebarSkeleton from "@/components/Skeletons/RsidebarSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import { useLoginStore } from "@/stores/useLoginStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const Profile = dynamic(() => import("../../components/Profile"), {
  loading: () => <ProfileSkeleton />,
});
const UseSidebar = dynamic(() => import("./UseSidebar"), {
  loading: () => <SidebarSkeleton />,
});
const Rsidebar = dynamic(() => import("./Rsidebar"), {
  loading: () => <RsidebarSkeleton />,
});
export default function Layout({ children }: Props) {
  const { user } = useLoginStore();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  return (
    <>
      {mounted && user && (
        <>
          <div className="h-12"></div>
          <div className="px-2 flex justify-between w-full">
            <UseSidebar />
            {children}
            <div>
              <Profile />
              <Rsidebar />
            </div>

            <ScrollTop />
          </div>
        </>
      )}
    </>
  );
}
