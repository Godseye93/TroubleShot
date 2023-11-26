"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

type Star = {
  top: string;
  left: string;
  animationDelay: string;
};

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className={styles.starContainer}>
      {stars.map((star, i) => (
        <div
          key={i}
          className={`${styles.star}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
