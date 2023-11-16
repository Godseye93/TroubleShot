import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function CardContentLSkeleton() {
  return (
    <>
      <div className="flex">
        <div className="rounded-lg flex-1 bg-white shadow-md h-[30rem]">
          <div className="w-full bg-main rounded-t-lg  h-10"></div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
        </div>
        <div className="rounded-lg flex-1 bg-white shadow-md h-[30rem]">
          <div className="w-full bg-main rounded-t-lg  h-10"></div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
          <div className="px-2 pb-2">
            <Skeleton width={200} />
            <Skeleton width={400} count={2} />
            <Skeleton width={200} />
            <Skeleton width={150} />
            <div className="mt-3 border-b-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
