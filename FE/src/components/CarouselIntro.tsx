"use client"
import React, { useState } from 'react';
import Image from "next/image";
import exImage from "../../public/logo/seul.jpg"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

export default function CarouselIntro() {

  const imageList = [exImage, exImage, exImage, exImage, exImage];
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
    <div className="w-9/12 bg-main rounded-lg mt-80 ">
      <div className='flex'>
      <button className=' hover:scale-150 h-fit' onClick={prevHandler}><IoArrowBackCircleSharp/></button>
      <div className=" w-5/12 me-5">
        <Image src={exImage} alt="example" className="w-3/4 p-8 rounded-lg"/>
      </div>
      <div className=" w-7/12 ">
        {current}
      </div>
      <button className=' hover:scale-150 h-fit' onClick={nextHandler}><IoArrowForwardCircleSharp/></button>
      </div>
      <ul className="flex w-full justify-center gap-4">
        {imageList.map((_, idx) => (
          <li key={idx} className={`h-[1.2rem] w-[1.2rem] rounded-full bg-sub ${idx === current ? 'opacity-100' : 'opacity-50'}`} onClick={() => setCurrent(idx)}/>
        ))}
      </ul>
    </div>
  );
}
