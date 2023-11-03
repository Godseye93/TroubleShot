"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import Dots from "../components/home/dots";
import Stars from "@/components/home/stars";
import FirstIntro from "../components/home/FirstIntro";
import FeatureIntro from "../components/home/FeatureIntro";
import CarouselIntro from "../components/home/CarouselIntro";
import HomeOutro from "../components/home/HomeOutro";
import Footer from "../components/Footer";

export default function Page() {
  const outerDivRef = useRef<any>();
  // useRef 타입 명시

  const [scrollIndex, setScrollIndex] = useState(1);

  // scrollTo로 이동할 때 정확히 해당 위치가 아닌 조금 위로 이동하게 되어서 오차가 생김
  // 오차 방지하기 위해
  const DIVIDER_HEIGHT = 5;

  useEffect(() => {
    const wheelHandler = (e: any) => {
      // event type 명시
      e.preventDefault();
      // 스크롤 행동 구현
      const { deltaY } = e; // e에서 deltaY 추출, 마우스 휠 스크롤 양
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분
      const pageHeight = window.innerHeight; // 화면 세로길이

      if (deltaY > 0) {
        // 스크롤 내릴 때

        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지면
          // 2페이지 이동
          // console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지면
          // 3페이지 이동
          // console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지면
          // 4페이지 이동
          // console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        } else {
          // 현재 4페이지
          // 4페이지 이동
          // console.log("현재 4페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        }
      } else {
        // 스크롤 올릴 때

        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          // 1페이지 이동
          // console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          // 1페이지 이동
          // console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          // 2페이지 이동
          // console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else {
          // 4페이지 이동
          // 현재 3페이지
          // console.log("현재 4페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <main ref={outerDivRef} className={styles.outer}>
      <Dots scrollIndex={scrollIndex} />
      <Stars />
      <div className={`${styles.inner} bg-black text-white`}>
        <FirstIntro />
      </div>
      <div className={styles.divider}></div>
      <div className={`${styles.inner} relative`}>
        <FeatureIntro />
      </div>
      <div className={styles.divider}></div>
      <div className={`${styles.inner} relative`}>
        <CarouselIntro />
      </div>
      <div className={styles.divider}></div>
      <div className={`${styles.inner} bg-black text-white`}>
        <HomeOutro />
      </div>
    </main>
  );
}
