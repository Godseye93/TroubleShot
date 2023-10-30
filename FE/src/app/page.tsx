"use client"
import styles from "../styles/Home.module.css";

import FirstIntro from "../components/FirstIntro";
import FeatureIntro from "../components/FeatureIntro";
import CarouselIntro from "../components/CarouselIntro";
import HomeOutro from "../components/HomeOutro";

import ReactFullpage from '@fullpage/react-fullpage';

type PageObjArray = JSX.Element[];

type Credits = {
  enabled?: boolean;
  label?: string;
  position?: "left" | "right";
};

const credits: Credits = {
  enabled: true,
  label: "",
  position: "left",
};

export default function Home() {
  
  const pageObjArray: PageObjArray = [
    <FirstIntro/>,
    <FeatureIntro/>,
    <CarouselIntro/>,
    <HomeOutro/>,
]

  return (
    <div className="bg-gradient-to-b from-black">
      <main className="flex flex-col items-center gap-4 text-white">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`${styles.star} ${styles[`twinkle${(i % 4) + 1}`]}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
         <ReactFullpage
        licenseKey={"OPEN-SOURCE-GPLV3-LICENSE"}
        scrollingSpeed = {1000}
        navigation
        scrollOverflow = {true}
        // onLeave={onLeave}
        // pluginWrapper={pluginWrapper}
        // debug={false}
        credits={credits}
        render={() => (
          <ReactFullpage.Wrapper>
            {pageObjArray.map((Component, i) => (
              <div key={i} className="section">
              {Component}
            </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      />
      </main>
    </div>
  );
}
