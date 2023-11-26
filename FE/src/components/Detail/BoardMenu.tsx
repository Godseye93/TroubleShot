"use client";

import React, { SetStateAction, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { deleteAnswer, deleteAnswerComment, deleteComment, deleteTrouble } from "@/api/trouble";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BoardMenu({
  userSeq,
  troubleSeq,
  answerSeq,
  setShowUpdate,
}: {
  userSeq: number;
  troubleSeq: number;
  answerSeq?: number;
  setShowUpdate?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleShow = () => {
    setShowMenu((prev) => !prev);
  };
  const router = useRouter();
  const onDeleteComment = async () => {
    if (!answerSeq) {
      if (window.confirm("트러블 슈팅을 삭제하시겠습니까?")) {
        try {
          await deleteTrouble(userSeq, troubleSeq)
            .then(() => {
              router.back();
            })
            .then(() => {
              toast.success("트러블 슈팅이 삭제되었습니다");
            });
          toast;
        } catch (err) {
          toast.error("삭제에 실패했습니다");
          console.log(err);
        }
      }
    } else if (answerSeq) {
      if (window.confirm("답변을 삭제하시겠습니까?")) {
        try {
          await deleteAnswer(userSeq, troubleSeq, answerSeq);
          toast.success("삭제되었습니다");
          queryClient.invalidateQueries({ queryKey: ["detail", troubleSeq], exact: true });
        } catch (err) {
          toast.error("삭제에 실패했습니다");
          console.log(err);
        }
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
            {!setShowUpdate ? (
              <Link href={`/trouble/update/${troubleSeq}`}>
                <div className=" hover:bg-gray-200 h-12 flex items-center justify-center">
                  <div className="me-1">
                    <HiMiniPencilSquare />
                  </div>
                  수정하기
                </div>
              </Link>
            ) : (
              <div
                className=" hover:bg-gray-200 h-12 flex items-center justify-center"
                onClick={() => setShowUpdate(true)}
              >
                <div className="me-1">
                  <HiMiniPencilSquare />
                </div>
                수정하기
              </div>
            )}

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
