"use client";
/* eslint-disable */
import React, { SetStateAction } from "react";

export default function SetOptions({
  title,
  options,
  setSelectedOption,
  selectedOption,
}: {
  title: string;
  options: string[];
  setSelectedOption: React.Dispatch<SetStateAction<number>>;
  selectedOption: number;
}) {
  return (
    <div className="flex pb-5">
      <div className="w-20 font-semibold">{title}</div>
      <div className="flex flex-col gap-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`option-btn ${selectedOption === idx && "bg-main font-semibold shadow-md"}`}
            onClick={() => setSelectedOption(idx)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
