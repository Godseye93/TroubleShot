import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchbarSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md px-10 py-5 h-[5rem] mt-4 mx-2 gap-5 flex flex-1  ">
      <Skeleton width={100} height={40} />
      <Skeleton width={800} height={40} />
    </div>
  );
}
