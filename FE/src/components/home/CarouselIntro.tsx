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
    { index: 5, Image: exImage5, name: "진욱", text: "장진욱 팀원", review: "fffffffffffffffffffffffffffffffffffffff" },
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
      return prev + 100 / 6;
    });
  };
  const testPrevious = () => {
    setValue((prev) => {
      return prev - 100 / 6;
    });
  };

  const nextHandler = () => {
    testNext();
    setCurrent(() => {
      if (current > 4) {
        return 0;
      } else {
        return current + 1;
      }
    });
  };

  const prevHandler = () => {
    testPrevious();
    setCurrent(() => {
      if (current === 0) {
        return imageList.length - 1;
      } else {
        return current - 1;
      }
    });
  };
  return (
    <div className="w-full h-3/4 flex flex-col justify-center">
      <h1 className="w-full text-3xl font-bold  m-5 ms-10">만든 사람들</h1>
      <div
        id="carouselIntor"
        className="w-[600%] h-3/4 bg-main flex overflow-hidden"
        onMouseMove={trackCursor}
        onMouseLeave={hideCursor}
      >
        <div className={"flex w-full"} style={{ transform: `-translateX(${value}%)` }}>
          {imageList.map((item, index) => (
            <div key={index} className="flex w-1/6">
              <div
                className="w-1/6 active:bg-gray-200"
                onClick={prevHandler}
                onMouseEnter={() => {
                  changeCursorText("이전으로");
                  changeCss("custom-cursor-left");
                }}
                onMouseLeave={() => {
                  changeCursorText("오리엔탈 샐러드");
                  changeCss("custom-cursor");
                }}
              ></div>
              <div className="w-4/6">
                <Image className="w-1/6 rounded-lg" src={item.Image} alt={item.text} />
                <div className="w-1/6 mt-3 text-2xl text-center font-bold">{item.text}</div>
              </div>
              <div
                className="w-1/6 active:bg-gray-200"
                onClick={nextHandler}
                onMouseEnter={() => {
                  changeCursorText("앞으로");
                  changeCss("custom-cursor-right");
                }}
                onMouseLeave={() => {
                  changeCursorText("오리엔탈 샐러드");
                  changeCss("custom-cursor");
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <ul className="flex w-full justify-center gap-4 mb-2 list-none">
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
//       <div className="w-full mt-3 text-2xl text-center font-bold">{item.text}</div>
//     </div>
//   </li>
// ))}
// <div className="opacity-100">
//   <FaQuoteLeft />
//   {imageList.map((item, index) => (
//     <div
//       className=" w-3/6 me-5 h-full flex flex-col justify-between"
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
  /* <div className="bg-red-600 flex h-full">
            <div className="w-1/6" onClick={testPrevious}>
            
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="bg-red-300 flex h-full">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="bg-red-400 flex h-full">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div>
          <div className="bg-red-500 flex h-full">
            <div className="w-1/6" onClick={testPrevious}>
              1
            </div>
            <div className="w-4/6">3</div>
            <div className="w-1/6" onClick={testNext}>
              2
            </div>
          </div> */
}
