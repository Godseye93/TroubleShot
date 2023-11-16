import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BobySkeleton() {
  return (
    <div className="rounded-lg mx-2 bg-white shadow-md mt-2 p-5">
      <div className="border-b-2 pb-10">
        <div className="flex  gap-5">
          <Skeleton circle width={50} height={50} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="ps-5 mt-5 flex-col gap-5 flex">
          <Skeleton height={20} width={500} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
        </div>
      </div>
      <div className="border-b-2 pb-10 mt-5">
        <div className="flex  gap-5">
          <Skeleton circle width={50} height={50} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="ps-5 mt-5 flex-col gap-5 flex">
          <Skeleton height={20} width={500} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
        </div>
      </div>
      <div className="mt-5 pb-10">
        <div className="flex  gap-5">
          <Skeleton circle width={50} height={50} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="ps-5 mt-5 flex-col gap-5 flex">
          <Skeleton height={20} width={500} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
        </div>
      </div>
    </div>
  );
}
