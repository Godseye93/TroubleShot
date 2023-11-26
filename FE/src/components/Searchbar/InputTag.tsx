"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function InputTag({
  setTags,
  showTitle,
}: {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  showTitle: boolean;
}) {
  const [inputText, setInputText] = useState("");
  const addTag = () => {
    if (!inputText) return;
    setTags((prev) => [...prev, inputText]);
    setInputText("");
  };
  return (
    <div className="mt-5">
      <div className="flex items-center">
        {showTitle && <div className="w-20 font-semibold">태그 추가</div>}
        <div className="relative flex-1">
          <div className="absolute left-4 top-[50%] -translate-y-[50%]">
            <BsSearch />
          </div>
          <input
            className=" w-full bg-silver rounded-full border-black border border-opacity-30 h-8 shadow-md  ps-10"
            type="text"
            placeholder="태그를 입력하세요"
            value={inputText}
            onChange={({ target: { value } }) => setInputText(value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
        </div>
        <button
          onClick={() => {
            addTag();
          }}
          className="bg-sub text-white py-1 px-2 rounded-full ms-2 shadow-md shadow-red-300 hover:shadow-none hover:bg-red-700"
        >
          추가
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
