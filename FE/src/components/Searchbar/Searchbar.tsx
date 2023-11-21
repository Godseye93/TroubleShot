"use client";
import { SearchParams } from "@/types/TroubleType";
import Options from "./Options";
import { SetStateAction, useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { RiEqualizerLine } from "react-icons/ri";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  PropsOptions?: SearchParams;
  isCommunity?: boolean;
  baseUrl: string;
  queryKey: string;
  setPropsOptions: React.Dispatch<React.SetStateAction<SearchParams>>;
}
export default function Searchbar({ PropsOptions, isCommunity, baseUrl, queryKey, setPropsOptions }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [keyword, setKeyword] = useState(PropsOptions?.keyword ?? "");
  const [searchCriteria, setSearchCriteria] = useState("제목");
  const [options, setOptions] = useState<SearchParams>(PropsOptions ?? {});
  const { user } = useLoginStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onSearch = () => {
    const searchOption: SearchParams = {
      ...options,
      ...(searchCriteria === "제목" ? { keyword: keyword } : { writer: keyword }),
    };
    const params = new URLSearchParams();

    // searchOption을 반복하면서 쿼리 문자열 추가
    Object.entries(searchOption).forEach(([key, value]) => {
      // value가 undefined 또는 null이 아닌 경우에만 추가
      if (
        (value !== undefined && value !== null) ||
        (typeof value === "string" && value.trim() !== "") ||
        (Array.isArray(value) && value.length > 0)
      ) {
        params.append(key, value.toString());
      }
    });
    setPropsOptions(searchOption);
    router.push(`/${baseUrl}?${params.toString()}`);
  };

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-md px-5 py-5
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
        <div className="w-full ms-5">
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
                onKeyUp={(e) => {
                  if (e.key === "Enter") onSearch();
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
          <Options propsSetOption={setOptions} propsTags={options.tags} />
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
