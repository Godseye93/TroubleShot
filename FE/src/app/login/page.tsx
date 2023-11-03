"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Github_logo from "../../../public/logo/Github_logo.png";

import backgroundImage from "../../../public/background/loginBackground4.jpg";

import { loginSubmit } from "@/api/account";
import { ReqLogin } from "@/types/CommonType";

export default function Page() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [blurValue, setBlurValue] = useState(20); // 블러

  // 비밀번호 입력 길이로 블러 얕게
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const length = input.length;
    const blurValue = 20 - length * 2;
    setBlurValue(blurValue);
  };

  const handleSubmit = async () => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const params: ReqLogin = {
      email: email,
      password: password,
      type: 0,
    };
    try {
      const res = await loginSubmit(params);
      if (res.success) {
        console.log("로그인 성공 !");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <main className="fcc w-full h-[100vh]">
      <Image
        src={backgroundImage}
        alt="backgroundImage"
        className={`bg-cover h-screen absolute w-full -z-10`}
        style={{
          filter: `blur(${blurValue}px)`,
        }}
      />

      <div className="bg-white rounded p-10 text-center shadow-md w-[25rem]">
        <h1 className="text-3xl border-b border-main">로그인</h1>
        <div className="my-4 text-left">
          <label className="text-gray-900">아이디</label>
          <input
            type="text"
            className="border block w-full p-2 rounded"
            id="email"
            ref={emailRef}
            placeholder="이메일을 입력하세요."
          />
        </div>

        <div className="my-4 text-left">
          <label className="text-gray-900">비밀번호</label>
          <input
            type="password"
            className="border block w-full p-2 rounded"
            id="password"
            ref={passwordRef}
            placeholder="비밀번호를 입력하세요"
            onChange={handlePasswordInputChange}
          />
        </div>

        <div id="submitBox" className="flex flex-col justify-around mt-6 mb-4">
          <button
            className="bg-main hover:bg-yellow-700 duration-300 text-white py-2 inline-block w-full rounded"
            type="submit"
            onClick={handleSubmit}
          >
            로그인
          </button>
          <div className="w-full flex items-center my-2">
            <div className="flex-1">
              <hr />
            </div>
            <div className="mx-1 flex items-center">OR</div>
            <div className="flex-1">
              <hr />
            </div>
          </div>
          <button className="flex bg-black text-white w-full rounded fcc">
            <Image src={Github_logo} className="w-10 me-1" alt="" />깃 허브로 로그인하기
          </button>
        </div>

        <Link href="/signUp" className="">
          <p>트러블 샷이 처음이신가요?</p>
        </Link>
      </div>
    </main>
  );
}
