import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SidebarSkeleton() {
  return (
    <div className="w-[14%] h-[91vh] bg-white shadow-lg mt-4 rounded-lg pt-5  flex-col justify-between text-lg md:flex hidden">
      <div>
        <Skeleton count={3} height={50} className="mx-2" />
      </div>
    </div>
  );
}
