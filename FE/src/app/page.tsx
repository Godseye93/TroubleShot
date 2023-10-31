"use client"
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "../styles/Home.module.css";

import FirstIntro from "../components/FirstIntro";
import FeatureIntro from "../components/FeatureIntro";
import CarouselIntro from "../components/CarouselIntro";
import HomeOutro from "../components/HomeOutro";

import Buttons from "./example/Buttons";

export type PageObjArray = Array<{
  component: JSX.Element;
  pageNum: number;
}>;

type Star = {
  top: string;
  left: string;
  animationDelay: string;
};

export default function Home() {
  const [currentPageNum, setCurrentPageNum] = useState<number>(0);
  const pageRefs = useRef<HTMLDivElement[]>([]);
  
  const pageObjArray: PageObjArray = [
    { component: <FirstIntro />, pageNum: 0,  },
    { component: <FeatureIntro />, pageNum: 1 },
    { component: <CarouselIntro />, pageNum: 2 },
    { component: <HomeOutro />, pageNum: 3 },
  ];
  
  const totalNum = pageObjArray.length;
  
  // 버튼 페이지 변경 함수
  const handlePageChange = (event: Event) => {
    let scroll = window?.scrollY!;
    for (let i = 0; i < totalNum; i++) {
      // 스크롤이 해당 섹션에 진입했는지 판단 && 해당 스크롤이 해당 섹션에 머물러 있는지
      if (
        scroll > pageRefs.current[i].offsetTop - window!.outerHeight / 3 &&
        scroll <
          pageRefs.current[i].offsetTop -
            window!.outerHeight / 3 +
            pageRefs.current[i].offsetHeight
      ) {
        setCurrentPageNum(i);
        break;
      }
    }
  };

  
  // 버튼 클릭
  const handlePointClick = (pageNum: number) => {
    window?.scrollTo({
      top: pageRefs.current[pageNum].offsetTop,
      behavior: "smooth",
    });
  };



  useEffect(() => {
    if (window){
    window?.addEventListener("scroll", handlePageChange);
    return () => {
      window?.removeEventListener("scroll", handlePageChange);
    };}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // 배경 별 랜덤 배치를 위함
  const [stars, setStars] = useState<Star[]>([]);
  
  // useLayoutEffect를 사용하여 클라이언트 사이드에서만 랜더링 되도록 했다.
  useLayoutEffect(() => {
    const stars : Star[] = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStars(stars);
  }, []);

  return (
    <div className="bg-gradient-to-b from-black">
      <main className="flex flex-col items-center gap-4 text-white">
        <div className={styles.starContainer}>
        {stars.map((star, i) => (
          <div
            key={i}
            className={`${styles.star} `}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
        </div>

        {pageObjArray.map((item, index) => (
          <div 
          key={index} 
          ref={(element) => {
            pageRefs.current[index] = element!
          }} 
          className="w-screen h-screen"
          >
            {item.component}
          </div>
        ))}

        <div className="flex flex-col space-y-4 fixed top-96 right-10 z-10">
          <Buttons
            pageObjArray={pageObjArray}
            currentPageNum={currentPageNum}
            handlePointClick={handlePointClick}
          />
        </div>
      </main>
    </div>
  );
}
