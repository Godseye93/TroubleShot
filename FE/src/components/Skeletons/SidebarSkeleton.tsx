"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SidebarSkeleton() {
  return (
    <div className="w-[14%] h-[91vh]  bg-white shadow-lg mt-4 rounded-lg pt-5  flex-col  text-lg md:flex hidden">
      <div className="px-2">
        <Skeleton count={3} height={50} className="px-2" />
      </div>
    </div>
  );
}
