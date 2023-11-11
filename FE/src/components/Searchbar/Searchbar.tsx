"use client";
import { SearchParams } from "@/types/TroubleType";
import Options from "./Options";
import { SetStateAction, useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { RiEqualizerLine } from "react-icons/ri";
import { useLoginStore } from "@/stores/useLoginStore";

interface Props {
  setPropsOptions: React.Dispatch<SetStateAction<SearchParams>>;
  isCommunity?: boolean;
  // propsOptions: SearchParams;
}
export default function Searchbar({ setPropsOptions, isCommunity }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("제목");
  const [options, setOptions] = useState<SearchParams>({});
  const { user } = useLoginStore();
  const onSearch = () => {
    const searchOption: SearchParams = {
      ...options,
      ...(user && { loginSeq: user.member.seq }),
      ...(searchCriteria === "제목" ? { keyword: keyword } : { writer: keyword }),
    };
    setPropsOptions(searchOption);
    console.log(searchOption);
  };

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-md px-10 py-5
      ${showOptions ? "big-on" : isChanged ? "small-on" : "max-h-[5rem]"}
      `}
    >
      <div className="flex justify-center">
        <select
          className="p-1 rounded-lg border shadow-slate-600 hover:cursor-pointer shadow-sm h-10"
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <option value="제목">제목+내용</option>
          {isCommunity && <option value="작성자">작성자</option>}
        </select>
        <div className="w-full ms-2">
          <div className="flex justify-center w-full ">
            <div className="relative flex-1">
              <div className="absolute left-4 top-[50%] -translate-y-[50%]">
                <BsSearch />
              </div>
              <input
                className=" w-full bg-silver rounded-full border-black border border-opacity-30 h-10 shadow-sm  ps-10"
                type="text"
                placeholder="검색어를 입력하세요"
                defaultValue={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
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
            <button
              onClick={onSearch}
              className=" hover:shadow-inner rounded-lg shadow-md hover:bg-main ms-5 flex justify-center transition-all duration-200 items-center w-12 bg-softmain h-10"
            >
              검색
            </button>
          </div>
        </div>
      </div>
      {
        <div className={`w-full  ${showOptions ? "menu-anim-on" : isChanged ? "menu-anim-off" : "hidden"}`}>
          <Options propsSetOption={setOptions} />
        </div>
      }
      <div
        className={`flex justify-end mt-5 items-center gap-2 bottom-5 right-5 transition-opacity duration-300 ${
          !showOptions && "opacity-0"
        }`}
      >
        <button className="bg-sub text-white rounded-full py-1 px-2 shadow-md" onClick={() => setShowOptions(false)}>
          닫기
        </button>
      </div>
    </div>
  );
}
