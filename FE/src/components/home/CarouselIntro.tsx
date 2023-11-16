"use client";
import React, { MouseEvent, UIEvent, useEffect, useState } from "react";
import Image from "next/image";

import seul from "../../../public/carousel/seul.jpg";
import exImage2 from "../../../public/carousel/exImage2.jpg";
import exImage3 from "../../../public/carousel/exImage3.jpg";
import exImage4 from "../../../public/carousel/exImage4.jpg";
import exImage5 from "../../../public/carousel/exImage5.jpg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function CarouselIntro() {
  const imageList = [
    { index: 0, Image: seul, name: "슬호", text: "정슬호 팀장", review: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { index: 1, Image: exImage2, name: "예림", text: "고예림 팀원", review: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
    { index: 2, Image: exImage3, name: "수현", text: "김수현 팀원", review: "ccccccccccccccccccccccccccccccccccc" },
    { index: 3, Image: exImage4, name: "종률", text: "권종률 팀원", review: "dddddddddddddddddddddddddddddddddddd" },
    { index: 4, Image: exImage5, name: "재형", text: "손재형 팀원", review: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
    { index: 5, Image: exImage2, name: "진욱", text: "장진욱 팀원", review: "fffffffffffffffffffffffffffffffffffffff" },
  ];
  const [current, setCurrent] = useState(0);

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

  const [value, setValue] = useState(0);

  const testNext = () => {
    setValue((prev) => {
      if (Math.round(prev + 100 / 6) === 100) return prev;
      return prev + 100 / 6;
    });
  };
  const testPrevious = () => {
    setValue((prev) => {
      if (Math.round(prev - 100 / 6) === 0 || prev - 100 / 6 < 0) return 0;
      return prev - 100 / 6;
    });
  };

  useEffect(() => {
    winRef.current.style.transform = `translateX(-${value}%)`;
    console.log(value);
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const winRef = React.useRef<any>();
  return (
    <div className="flex flex-col justify-center w-full h-3/4">
      <h1 className="w-full m-5 text-3xl font-bold ms-10">만든 사람들</h1>
      <div id="carouselIntor" className="relative h-3/4 bg-main" onMouseMove={trackCursor} onMouseLeave={hideCursor}>
        <button onClick={testPrevious} className="absolute left-0 z-10 w-20 h-full">
          전으로
        </button>
        <div className=" w-[600vw] h-full flex relative" ref={winRef}>
          <div className={" w-1/6 h-full bg-red-500"}>1</div>
          <div className={" w-1/6 h-full bg-cyan-400"}>2</div>
          <div className={" w-1/6 h-full bg-orange-200"}>3</div>
          <div className={" w-1/6 h-full bg-lime-400"}>4</div>
          <div className={" w-1/6 h-full bg-blue-600"}>5</div>
          <div className={" w-1/6 h-full bg-purple-600"}>6</div>
        </div>

        <button onClick={testNext} className="absolute top-0 right-0 z-10 w-20 h-full">
          다음으로
        </button>
      </div>
      <ul className="flex justify-center w-full gap-4 mb-2 list-none">
        {imageList.map((v, idx) => (
          <li
            key={idx}
            className={`text-lg ${idx === current ? "opacity-100 font-bold" : "opacity-50"}`}
            onClick={() => setCurrent(idx)}
          >
            {v.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

{
  /* <div
          className="w-3/12 active:bg-gray-200"
          onClick={prevHandler}
          onMouseEnter={() => {
            changeCursorText("이전으로");
            changeCss("custom-cursor-left");
          }}
          onMouseLeave={() => {
            changeCursorText("오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        ></div> */
}

{
  /* <div
          className="w-3/12 active:bg-gray-200"
          onClick={nextHandler}
          onMouseEnter={() => {
            changeCursorText("앞으로");
            changeCss("custom-cursor-right");
          }}
          onMouseLeave={() => {
            changeCursorText("오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        ></div> */
}

// {visible && (
//   <div
//     className={`${customCursor} fcc text-center`}
//     style={{ left: `${position.x}px`, top: `${position.y}px` }}
//   >
//     <p className="w-3/4 text-white">{cursorText}</p>
//   </div>
// )}

// {imageList.map((item, index) => (
//   <li key={index}>
//     <div className="w-2/6 opacity-100" style={{ display: index === current ? "block" : "none" }}>
//       <Image className="rounded-lg" src={item.Image} alt={item.text} />
//       <div className="w-full mt-3 text-2xl font-bold text-center">{item.text}</div>
//     </div>
//   </li>
// ))}
// <div className="opacity-100">
//   <FaQuoteLeft />
//   {imageList.map((item, index) => (
//     <div
//       className="flex flex-col justify-between w-3/6 h-full me-5"
//       key={index}
//       style={{ display: index === current ? "block" : "none" }}
//     >
//       {item.review}
//     </div>
//   ))}
//   <FaQuoteRight />
// </div>

// ---------------

{
  /* <div className="flex h-full bg-red-600">
            <div className="w-1/6" onClick={testPrevious}>
            
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="flex h-full bg-red-300">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="flex h-full bg-red-400">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="flex h-full bg-red-500">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div> */
}
