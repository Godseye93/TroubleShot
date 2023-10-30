"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiEqualizerLine } from "react-icons/ri";
export default function Searchbar() {
  const [showOptions, setShowOptions] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  return (
    <div className="w-full bg-white rounded-lg shadow-md px-10 py-5 ">
      <div className="flex justify-center">
        <select className="p-1 rounded-lg border shadow-slate-600 hover:cursor-pointer shadow-sm">
          <option value="제목+내용">제목+내용</option>
          <option value="작성자">작성자</option>
          <option value="기술스택">기술스택</option>
        </select>
        <div className="relative flex-1">
          <div className="absolute left-4 top-[50%] -translate-y-[50%]">
            <BsSearch />
          </div>
          <input
            className=" w-full bg-silver rounded-full border-black border ms-2 border-opacity-30 h-10 shadow-sm  ps-7"
            type="text"
            placeholder="검색어를 입력하세요"
          />
        </div>

        <button
          onClick={() => {
            setIsChanged(true);
            setShowOptions((prev) => !prev);
          }}
          className="text-2xl hover:shadow-inner rounded-lg hover:bg-silver ms-5 flex justify-center items-center w-10 h-10"
        >
          <RiEqualizerLine />
        </button>
        <button className=" hover:shadow-inner rounded-lg hover:bg-main ms-5 flex justify-center items-center w-12 bg-softmain h-10">
          검색
        </button>
      </div>
      {<div className={showOptions ? "menu-anim-on" : isChanged ? "menu-anim-off" : "hidden"}>하하하하하하하</div>}
    </div>
  );
}
