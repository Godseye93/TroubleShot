"use client";
import Link from "next/link";
import Image from "next/image";

import backgroundImage from "../../../public/background/loginBackground4.jpg";

export default function Page() {
  return (
    <main className="fcc w-full h-[100vh]">
      <Image src={backgroundImage} alt="backgroundImage" className="bg-cover h-screen absolute w-full -z-10" />
      <div className="bg-white rounded p-10 text-center shadow-md">
        <h1 className="text-3xl border-b border-main">로그인</h1>
        <div className="my-4 text-left">
          <label className="text-gray-900">아이디</label>
          <input
            type="text"
            className="border block w-full p-2 rounded"
            id="email"
            placeholder="이메일을 입력하세요."
          />
        </div>

        <div className="my-4 text-left">
          <label className="text-gray-900">비밀번호</label>
          <input
            type="password"
            className="border block w-full p-2 rounded"
            id="password"
            placeholder="비밀번호를 입력하세요"
            // onChange={(e)=>{}}
          />
        </div>

        <div id="submitBox" className="flex justify-around mt-6 mb-4">
          <button className="bg-main text-white py-2 inline-block w-5/12 rounded" type="submit">
            Submit
          </button>
          <button className="bg-black text-white py-2 inline-block w-5/12 rounded" type="submit">
            git hub
          </button>
        </div>

        <Link href="/signUp" className="">
          <p>트러블 샷이 처음이신가요?</p>
        </Link>
      </div>
    </main>
  );
}
