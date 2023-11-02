"use client"
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

import FirstIntro from "../components/home/FirstIntro";
import FeatureIntro from "../components/home/FeatureIntro";
import CarouselIntro from "../components/home/CarouselIntro";
import HomeOutro from "../components/home/HomeOutro";

import Buttons from "../components/home/Buttons";

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
  
  // 스크롤이 해당 섹션에 진입했는지, 그리고 해당 스크롤이 섹션에 머물러 있는지 판단하는 함수
  const isInSection = (scroll: number, ref: any) => {
    const offsetTop = ref.offsetTop; // 현재 섹션의 상단이 페이지 상단에서 얼마나 떨어져 있는지
    const offsetHeight = ref.offsetHeight; // 현재 섹션의 높이
    const windowOuterHeight = window!.outerHeight; // 현재 보이는 화면의 높이
    
    return scroll > offsetTop - windowOuterHeight / 3 && scroll < offsetTop - windowOuterHeight / 3 + offsetHeight;
  };

  // 버튼 페이지 변경 함수
  const handlePageChange = (event: Event) => {
    let scroll = window?.scrollY!;
    for (let i = 0; i < totalNum; i++) {
      if (isInSection(scroll, pageRefs.current[i])) {
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


  // 배경 별 랜덤 배치를 위함
  const [stars, setStars] = useState<Star[]>([]);


  // 별 랜덤 배치와 scroll 이벤트리스너를 합침
  useEffect(() => {
    const stars = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStars(stars);

    if (window) {
      window.addEventListener("scroll", handlePageChange);
      return () => {
        window.removeEventListener("scroll", handlePageChange);
      };
    }}, []);
  // 새로고침 했을 때 문제 있음
  // 버튼이 제일 상단에 위치하게 됨
  // 두 번째 매개변수에 window를 넣었을 땐 터미널에 오류 생김
  // useEffect가 두 번 실행됨
  // setStars가 실행되어 stars의 상태 변화로 useEffect가 한번 더 실행됨


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

        <div className="flex flex-col space-y-4 fixed top-80 right-10 z-10">
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
