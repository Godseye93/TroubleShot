"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillPlusCircle } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types/TroubleType";
import { toast } from "react-toastify";
import { deleteCategory, postCategory, putCategory } from "@/api/trouble";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
interface Props {
  categories: Category[];
  userSeq: number;
}
export default function CategoryAddBtn({ categories, userSeq }: Props) {
  const [isShow, setIsShow] = useState(false);
  const name = usePathname().split("/")[3];
  // 지금 isShow가 바뀌어서 false인지 알게하는 함수, 이거없으면 맨처음 마운트될때도 닫히는 애니메이션 켜짐
  const [isChanged, setIsChanged] = useState(false);
  const queryClient = useQueryClient();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [inputText, setInputText] = useState("");
  const onPostCategory = async () => {
    if (inputText.trim() === "") return toast.error("카테고리가 입력되지 않았습니다");
    if (!categories.every((val) => val.name !== inputText.trim()))
      return toast.error("이미 동일한 카테고리가 존재합니다");
    try {
      await postCategory(userSeq, inputText);
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: true });
      setInputText("");
    } catch (err) {
      toast.error("등록에 실패했습니다");
      console.log(err);
    }
  };
  const [showUpdate, setShowUpdate] = useState<number | null>(null);
  const [updateInput, setUpdateInput] = useState("");

  const onPutCategory = async (categorySeq: number) => {
    if (!categories.every((val) => val.name !== updateInput.trim()))
      return toast.error("이미 동일한 카테고리가 존재합니다");
    try {
      await putCategory(userSeq, updateInput, categorySeq);
      toast.success("수정되었습니다");
      setShowUpdate(null);
      setUpdateInput("");
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: true });
    } catch (err) {
      toast.error("수정에 실패했습니다");
    }
  };

  const onDeleteCategory = async (categorySeq: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteCategory(userSeq, categorySeq);
        queryClient.invalidateQueries({ queryKey: ["categories"], exact: true });
      } catch (err) {
        toast.error("실패했습니다");
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="w-full fcc relative">
        <button
          className="fcc bg-sub  text-white rounded-full w-3/4 h-10  shadow-red-600 shadow-md mb-5 flex hover:shadow-md hover:bg-pink-700 transition-all"
          onClick={() => setIsShow((prev) => !prev)}
        >
          <AiFillPlusCircle />
          <p className="ms-2 line-clamp-1">카테고리 편집</p>
        </button>
        {isShow && (
          <div
            className="absolute  z-50 left-0 -top-0 -translate-y-full w-[30rem] shadow-md bg-white p-5 rounded-lg border-2"
            ref={menuRef}
          >
            <div className="flex justify-between ">
              <p className="font-semibold text-lg">카테고리 편집</p>
              <button className="text-white bg-sub shadow-md rounded-lg py-1 px-2" onClick={() => setIsShow(false)}>
                닫기
              </button>
            </div>
            <p className=" border-t-2 mt-2 pt-2">카테고리 추가</p>
            <div className="flex items-center border-b-2 mb-2 pb-2">
              <input
                className=" w-full mt-2 bg-silver rounded-full border-black border border-opacity-30 h-9 flex-1 shadow-sm  ps-5"
                type="text"
                value={inputText}
                placeholder="카테고리를 입력하세요"
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    onPostCategory();
                  }
                }}
              />
              <button
                onClick={onPostCategory}
                className="rounded-lg bg-main shadow-md py-1 px-2 ms-3  hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
              >
                추가하기
              </button>
            </div>
            {categories.map((category, idx) => {
              return (
                <div
                  key={idx}
                  className="p-1 mt-2 flex items-center justify-between bg-main rounded-lg ps-3 shadow-md "
                >
                  {showUpdate !== idx ? (
                    <>
                      <p className="max-w-full line-clamp-1">{category.name}</p>
                      <div className="flex gap-2 ">
                        <div
                          className="hover:text-slate-200 hover:cursor-pointer transition-colors duration-200"
                          onClick={() => {
                            setUpdateInput(category.name);
                            setShowUpdate(idx);
                          }}
                        >
                          <FaRegPenToSquare />
                        </div>
                        <div
                          className="hover:text-sub hover:cursor-pointer transition-colors duration-200"
                          onClick={() => onDeleteCategory(category.seq)}
                        >
                          <FaTrashAlt />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={updateInput}
                        className="bg-main border-b-2 border-sub ps-2"
                        onChange={(e) => setUpdateInput(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            onPutCategory(category.seq);
                          }
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 rounded-lg shadow-md border-2"
                          onClick={() => {
                            onPutCategory(category.seq);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="p-1 rounded-lg shadow-md text-white bg-sub"
                          onClick={() => {
                            setShowUpdate(null);
                          }}
                        >
                          취소
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
