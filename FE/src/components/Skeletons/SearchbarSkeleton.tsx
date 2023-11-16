import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Searchbar() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md px-10 py-5 h-[5rem]">
      <Skeleton />
    </div>
  );
}
