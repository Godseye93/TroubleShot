"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileSkeleton() {
  return (
    <div className="rounded-lg w-60 bg-white shadow-md h-72 mt-4">
      <div className="rounded-lg">
        <div className="fcc">
          <Skeleton height={150} width={150} circle containerClassName={"gap-5"} />
        </div>
        <div className="text-center font-semibold line-clamp-1 mt-5 pb-2"></div>
      </div>
      <div className="py-3 mx-3 border-t-2"></div>
    </div>
  );
}
