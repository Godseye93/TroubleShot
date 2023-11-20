"use client";
import { useState } from "react";
import Image from "next/image";
import function1 from "../../../public/functionFolder/function1.gif";
import function2 from "../../../public/functionFolder/function2.gif";
import function3 from "../../../public/functionFolder/function3.gif";

export default function FeatureIntro() {
  type MyTabType = 1 | 2 | 3;

  type MyTabMap = {
    [key: string]: MyTabType;
  };

  const MY_TAB: MyTabMap = {
    기능1: 1,
    기능2: 2,
    기능3: 3,
  };

  const [content, setContent] = useState<MyTabType>(MY_TAB.기능1);

  let contentsFile = function1;

  if (content == 1) {
    contentsFile = function1;
  } else if (content == 2) {
    contentsFile = function2;
  } else if (content == 3) {
    contentsFile = function3;
  }

  return (
    <div className="w-full h-3/4">
      <h1 className="w-full text-3xl font-bold m-5 ms-10">트러블 샷의 주요 기능</h1>
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-between w-1/4 py-5">
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 h-1/4 text-2xl fcc rounded-lg mb-3 shadow-md overflow-hidden cursor-pointer"
            onClick={() => setContent(MY_TAB.기능1)}
          >
            <p className="p-4 text-center">플러그인에서 버그 감지와 트러블 슈팅 작성 업로드</p>
          </div>
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 h-1/4 text-2xl fcc text-center rounded-lg mb-3 shadow-md overflow-hidden cursor-pointer"
            onClick={() => setContent(MY_TAB.기능2)}
          >
            <p className="p-4 text-center">마크다운 파일로 추출</p>
          </div>
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 h-1/4 text-2xl fcc text-center rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => setContent(MY_TAB.기능3)}
          >
            <p className="p-4 text-center">버그 검색과 AI를 활용한 문제 해결</p>
          </div>
        </div>
        <div className="w-8/12  bg-main rounded-lg shadow-md overflow-hidden">
          <div className=" bg-main w-full rounded-lg fcc h-[75vh]">
            <Image src={contentsFile} alt="" className="w-11/12 h-[70vh] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
