import Link from "next/link";
import IconBox from "./IconBox";

export default function MiniProfile() {
  return (
    <div className="rounded-lg w-52 bg-white shadow-md">
      <div className="w-full rounded-t-lg flex items-center justify-center">
        {/* <img src={user?.member.profileImg}></img> */}
        <Link href={""}>
          <p>전체보기 {">"} </p>
        </Link>
      </div>
      <div className="flex flex-col items-center p-2"></div>
    </div>
  );
}
