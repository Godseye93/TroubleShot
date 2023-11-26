"use client";
import Link from "next/link";
import img404 from "../../public/404Img.png";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div>
        <div className=" text-center text-[5rem] mt-16">404 Not Found</div>
        <div className="flex justify-center mt-10">
          <Image src={img404} width={300} height={300} alt="404 Error" />
        </div>
        <div className="flex justify-center mt-10 font-semibold text-lg">찾으시는 페이지가 존재하지 않습니다!</div>
        <div className="flex justify-center">
          <Link href={"/"}>
            <button className="w-28 h-10 bg-main font-semibold rounded-full shadow-md hover:bg-amber-500 transition-all duration-200 hover:shadow-none mt-10">
              홈으로 이동
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
