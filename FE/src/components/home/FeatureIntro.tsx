"use client";
import { useState } from "react";
import Image from "next/image";
import trous_favicon_origin from "/public/logo/trous_favicon_origin.png";
import trous_favicon_black from "/public/logo/trous_favicon_black.png";
import trous_favicon_white from "/public/logo/trous_favicon_white.png";

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

  let contentsFile = trous_favicon_origin;

  if (content == 1) {
    contentsFile = trous_favicon_origin;
  } else if (content == 2) {
    contentsFile = trous_favicon_black;
  } else if (content == 3) {
    contentsFile = trous_favicon_white;
  }

  return (
    <div className="w-full h-3/4">
      <h1 className="w-full text-3xl font-bold m-5 ms-10">트러블 샷의 주요 기능</h1>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-2/12">
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 py-4 text-2xl text-center rounded-lg mb-3"
            onClick={() => setContent(MY_TAB.기능1)}
          >
            <p>기능 1</p>
          </div>
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 py-4 text-2xl text-center rounded-lg mb-3"
            onClick={() => setContent(MY_TAB.기능2)}
          >
            <p>기능 2</p>
          </div>
          <div
            className="bg-main hover:bg-orange-600 duration-300 w-4/5 py-4 text-2xl text-center rounded-lg"
            onClick={() => setContent(MY_TAB.기능3)}
          >
            <p>기능 3</p>
          </div>
        </div>
        <div className="w-8/12 h-[380px] bg-main rounded-lg">
          <div className=" bg-main w-full rounded-lg fcc">
            <Image src={contentsFile} alt="" />
            <div>기능 소개 영상 들어가야 함</div>
          </div>
        </div>
      </div>
    </div>
  );
}
