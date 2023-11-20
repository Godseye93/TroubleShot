"use client";
import React, { useState } from "react";
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
    { index: 0, Image: exImage1, text: "안녕하세요" },
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

  return (
    <div id="carouselIntor" className="fcc mt-36 bg-softmain w-full">
      <div className="w-9/12 mt-8">
        <div className="flex justify-between items-center">
          <button className="hover:scale-150" onClick={prevHandler}>
            <IoArrowBackCircleSharp />
          </button>
          {imageList.map((item, index) => (
            <div className=" w-5/12 fcc" key={index} style={{ display: index === current ? "block" : "none" }}>
              <Image className="w-3/6 h-[300px] rounded-lg" src={item.Image} alt={item.text} />
            </div>
          ))}
          {imageList.map((item, index) => (
            <div className=" w-5/12 me-5" key={index} style={{ display: index === current ? "block" : "none" }}>
              <div className="w-7/12">{item.text}</div>
            </div>
          ))}
          <button className=" hover:scale-150" onClick={nextHandler}>
            <IoArrowForwardCircleSharp />
          </button>
        </div>
        <ul className="flex w-full justify-center gap-4 mb-2">
          {imageList.map((_, idx) => (
            <li
              key={idx}
              className={`h-[1.2rem] w-[1.2rem] rounded-full bg-sub ${idx === current ? "opacity-100" : "opacity-50"}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
