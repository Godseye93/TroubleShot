import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function page() {
  return (
    <div className="mt-20 mb-5 flex justify-center w-full">
      <div className="w-7/12 me-4">
        <div className="flex justify-center items-center bg-white rounded-lg mb-4 w-full p-5">
          <div className="w-1/6 flex flex-col items-center me-5">
            <Skeleton width={150} height={100} />
            <Skeleton width={150} height={30} />
          </div>
          <div className="me-10">{/* <Skeleton width={}/> */}</div>
        </div>
      </div>
    </div>
  );
}
