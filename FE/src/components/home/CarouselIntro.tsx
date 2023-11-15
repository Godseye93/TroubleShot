"use client";
import React, { MouseEvent, UIEvent, useState } from "react";
import Image from "next/image";

import exImage1 from "../../../public/carousel/seul.jpg";
import exImage2 from "../../../public/carousel/exImage2.jpg";
import exImage3 from "../../../public/carousel/exImage3.jpg";
import exImage4 from "../../../public/carousel/exImage4.jpg";
import exImage5 from "../../../public/carousel/exImage5.jpg";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

export default function CarouselIntro() {
  const imageList = [
    { index: 0, Image: exImage1, text: "팀장 정슬호" },
    { index: 1, Image: exImage2, text: "정슬호입니다." },
    { index: 2, Image: exImage3, text: "테스트테스트" },
    { index: 3, Image: exImage4, text: "원투원투쓰리" },
    { index: 4, Image: exImage5, text: "다섯번째캐러셀" },
  ];
  const [current, setCurrent] = useState(0);

  const nextHandler = () => {
    setCurrent(() => {
      if (current > 3) {
        return 0;
      } else {
        return current + 1;
      }
    });
  };

  const prevHandler = () => {
    setCurrent(() => {
      if (current === 0) {
        return imageList.length - 1;
      } else {
        return current - 1;
      }
    });
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("팀 오리엔탈 샐러드");
  const [customCursor, setCustomCursor] = useState("custom-cursor");

  const trackCursor = (event) => {
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

  return (
    <div className="w-full h-3/4">
      <h1 className="w-full text-3xl font-bold m-5 ms-10">만든 사람들</h1>
      <div
        id="carouselIntor"
        className="w-full h-3/4 bg-softmain flex "
        onMouseMove={trackCursor}
        onMouseLeave={hideCursor}
      >
        {visible && (
          <div
            className={`${customCursor} fcc text-center`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
            <p className="w-3/4 text-white">{cursorText}</p>
          </div>
        )}
        <div
          className="w-3/12 active:bg-orange-400 "
          onClick={prevHandler}
          onMouseEnter={() => {
            changeCursorText("이전으로");
            changeCss("custom-cursor-left");
          }}
          onMouseLeave={() => {
            changeCursorText("팀 오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        ></div>
        <div className="w-6/12 flex justify-between items-center">
          {imageList.map((item, index) => (
            <div className="w-2/6" key={index} style={{ display: index === current ? "block" : "none" }}>
              <Image className="rounded-lg" src={item.Image} alt={item.text} />
            </div>
          ))}
          {imageList.map((item, index) => (
            <div className=" w-3/6 me-5 " key={index} style={{ display: index === current ? "block" : "none" }}>
              <div className="w-fit text-4xl ">{item.text}</div>
            </div>
          ))}
        </div>
        <div
          className="w-3/12 active:bg-orange-400"
          onClick={nextHandler}
          onMouseEnter={() => {
            changeCursorText("앞으로");
            changeCss("custom-cursor-right");
          }}
          onMouseLeave={() => {
            changeCursorText("팀 오리엔탈 샐러드");
            changeCss("custom-cursor");
          }}
        ></div>
      </div>
    </div>
  );
}

{
  /* <ul className="flex w-full justify-center gap-4 mb-2">
          {imageList.map((_, idx) => (
            <li
              key={idx}
              className={`h-[1.2rem] w-[1.2rem] rounded-full bg-sub ${idx === current ? "opacity-100" : "opacity-50"}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </ul> */
}
