"use client";

import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { deleteComment } from "@/api/trouble";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentMenu({
  userSeq,
  troubleSeq,
  answerSeq,
  commentSeq,
}: {
  userSeq: number;
  troubleSeq: number;
  answerSeq?: number;
  commentSeq: number;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleShow = () => {
    setShowMenu((prev) => !prev);
  };
  const onDeleteComment = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        if (!answerSeq) {
          await deleteComment(userSeq, troubleSeq, commentSeq);
          queryClient.invalidateQueries({ queryKey: ["detail"], exact: true });
          toast.success("삭제되었습니다");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (showMenu && menuRef && !menuRef.current?.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [showMenu]);
  return (
    <div
      className="hover:bg-softmain transition-all duration-200 rounded-full p-1 hover:cursor-pointer relative"
      onClick={toggleShow}
      ref={menuRef}
    >
      <BsThreeDotsVertical />
      {showMenu && (
        <div className="absolute right-0 ">
          <div className="text-base w-28 border bg-white text-center rounded-lg shadow-md">
            <div className=" hover:bg-gray-200 h-12 flex items-center justify-center">
              <div className="me-1">
                <HiMiniPencilSquare />
              </div>
              수정하기
            </div>

            <div
              className=" hover:bg-gray-200 h-12 flex items-center justify-center text-red-400"
              onClick={onDeleteComment}
            >
              <div className="me-1">
                <RiDeleteBin6Line />
              </div>
              삭제하기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
