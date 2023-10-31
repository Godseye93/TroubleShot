import styles from "../styles/Home.module.css";

import FirstIntro from "../components/FirstIntro";
import FeatureIntro from "../components/FeatureIntro";
import CarouselIntro from "../components/CarouselIntro";
import HomeOutro from "../components/HomeOutro";

export default function Home() {
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

        <FirstIntro/>
        <FeatureIntro/>
        <CarouselIntro/>
        <HomeOutro/>

      </main>
    </div>
  );
}
