"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RsidebarSkeleton() {
  return (
    <div className="rounded-lg w-60 bg-white shadow-md h-96 mt-4">
      <div className="w-full h-7 px-2 bg-main rounded-t-lg flex items-center justify-between"></div>
      <div className="px-2 mt-2">
        <Skeleton count={3} height={70} containerClassName={"gap-5"} />
      </div>
    </div>
  );
}
