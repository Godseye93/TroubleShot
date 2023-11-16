"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import seul from "../../../public/carousel/seul.jpg";
import suhyun from "../../../public/carousel/suhyun.jpg";
import jinwook from "../../../public/carousel/jinwook.jpg";
import yerim from "../../../public/carousel/yerim.png";
import jongryul from "../../../public/carousel/jongryul.jpg";
import jaehyung from "../../../public/carousel/jaehyung.jpeg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type SlideTab = 0 | 1 | 2 | 3 | 4 | 5;

export default function CarouselIntro() {
  const imageList = [
    {
      index: 0,
      Image: seul,
      name: "슬호",
      review: "평소에 관심있던 플러그인 개발에 대해 관심이 있었습니다. 이번 기회에 많이 공부해서 좋았습니다.",
    },
    { index: 1, Image: yerim, name: "예림", review: "평소에 필요하다 느꼈던 부분을 직접 개발해서 뿌듯합니다." },
    {
      index: 2,
      Image: suhyun,
      name: "수현",
      review: "쿼리 계산을 통해 백엔드 역량을 키울 수 있었습니다. \n좋은 경험이었어요.",
    },
    { index: 3, Image: jongryul, name: "종률", review: "트러블 샷은 공짜입니다." },
    {
      index: 4,
      Image: jaehyung,
      name: "재형",
      review: "전역 상태 관리와 seo 최적화를 할 수 있었어요. 한층 더 성장한 것 같습니다.",
    },
    {
      index: 5,
      Image: jinwook,
      name: "진욱",
      review: "물 흐르듯 유연하고 확장 가능한 쿠버네티스로 효율적인 프로젝트를 경험해서 멋졌습니다",
    },
  ];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("오리엔탈 샐러드");
  const [customCursor, setCustomCursor] = useState("custom-cursor");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackCursor = (event: any) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setVisible(true);
  };

  const hideCursor = () => {
    setVisible(false); // 마우스가 영역을 벗어났을 때 커서가 보이지 않게 설정
  };

  const changeCursorText = (text: string) => {
    setCursorText(text);
  };

  const changeCss = (css: string) => {
    setCustomCursor(css);
  };

  const [curSlideTab, setCurSlideTab] = useState<SlideTab>(0);

  const testNext = () => {
    setCurSlideTab((prev): SlideTab => {
      if (prev === 5) return 0;
      return (prev + 1) as SlideTab;
    });
  };
  const testPrevious = () => {
    setCurSlideTab((prev) => {
      if (prev === 0) return 5;
      return (prev - 1) as SlideTab;
    });
  };

  useEffect(() => {
    winRef.current.style.transform = `translateX(-${(curSlideTab * 100) / 6}%)`;
    console.log(curSlideTab);
  }, [curSlideTab]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const winRef = React.useRef<any>();
  return (
    <div className="flex flex-col justify-center w-full h-3/4 overflow-hidden">
      <h1 className="w-full m-5 text-3xl font-bold ms-10">만든 사람들</h1>
      {visible && (
        <div className={`${customCursor} fcc text-center`} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
          <p className="w-3/4 text-white">{cursorText}</p>
        </div>
      )}
      <div id="carouselIntor" className="relative h-3/4 bg-main " onMouseMove={trackCursor} onMouseLeave={hideCursor}>
        <button
          onClick={testPrevious}
          className="absolute left-0 z-10 w-20 h-full"
          onMouseEnter={() => {
            changeCursorText("이전으로");
            changeCss("custom-cursor-left");
          }}
          onMouseLeave={() => {
            changeCursorText("오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        >
          <IoIosArrowBack />
        </button>
        <div className=" w-[600vw] h-full flex relative transition-transform duration-500" ref={winRef}>
          {imageList.map((value, index) => (
            <div key={index} className="w-4/6 fcc overflow-hidden">
              <Image src={value.Image} alt="" className="w-1/6 rounded-lg" />
              <div className="ms-10 py-6 w-3/6 h-full flex flex-col justify-between">
                <div className="w-full text-2xl">
                  <FaQuoteLeft />
                </div>
                <p className="p-5 px-5 text-2xl">{value.review}</p>
                <div className="w-full text-2xl">
                  <FaQuoteRight />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={testNext}
          className="absolute top-0 right-0 z-10 w-20 h-full"
          onMouseEnter={() => {
            changeCursorText("앞으로");
            changeCss("custom-cursor-right");
          }}
          onMouseLeave={() => {
            changeCursorText("오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <ul className="flex justify-center w-full gap-4 mb-2 list-none">
        {imageList.map((v, idx) => (
          <li key={idx} className={`text-lg ${idx === curSlideTab ? "opacity-100 font-bold" : "opacity-50"}`}>
            {v.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
