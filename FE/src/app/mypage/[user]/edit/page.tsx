"use client";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { putUserInfo } from "@/api/account";
import { EditReq } from "@/types/CommonType";

export default function page() {
  const { user, editStoreNickname } = useLoginStore();
  const userData = user?.member;
  const [mounted, setMounted] = useState<boolean>(false);
  const [nickname, setNickname] = useState("");
  const editNickname = async () => {
    // 입력된 값이 2자 이상 10자 이하인 경우에만 닉네임 업데이트
    if (nickname && nickname.length >= 2 && nickname.length <= 10) {
      // 여기에서 상태를 업데이트하거나 API 호출 등을 수행할 수 있습니다.
      const params: EditReq = {
        userSeq: userData!.seq,
        reqBody: {
          loginSeq: userData!.seq,
          type: 0,
          memberDTO: {
            seq: userData!.seq,
            email: userData!.email,
            profileImg: userData!.profileImg,
            nickname: nickname,
            locale: userData!.locale,
          },
        },
      };
      try {
        const res = await putUserInfo(params);
        if (res === "success") {
          editStoreNickname(nickname);
          // 토스트 띄우고 마이페이지로 돌아가기
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      // 유효하지 않은 경우에 대한 처리
      toast.warning("닉네임은 2자 이상 10자 이하여야 합니다.");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, [user]);

  return (
    mounted && (
      <div className="fcc flex-col h-[100vh]">
        <div className="bg-white text-center shadow-md w-1/4 rounded-lg overflow-hidden mb-2">
          <div className="w-full bg-main p-5">
            <p className="text-xl">회원정보 수정</p>
          </div>
          <div className="w-full">
            <div className="relative fcc cursor-pointer">
              <img src={user?.member.profileImg} alt="trosProfileImg" className="mb-2 w-3/4" />
              <span className="absolute bottom-3 right-10 bg-main p-4 rounded-full ">
                <MdOutlineModeEditOutline />
              </span>
            </div>
            <p className="text-2xl font-bold mb-3">{user?.member.nickname}</p>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-md w-1/4 rounded-lg overflow-hidden">
          <div className="flex w-full items-center justify-between border-b border-gray-300">
            <div>
              <BsPerson className="text-3xl m-3" />
            </div>
            <input
              className="text-lg w-2/5"
              placeholder="수정할 닉네임"
              onChange={(e) => setNickname(e.target.value)}
            />
            <div onClick={editNickname} className="bg-gray-300 rounded-lg me-2 p-1 cursor-pointer">
              수정
            </div>
          </div>
          <div className="flex w-full items-center">
            <AiOutlineMail className="text-2xl mx-4 my-3" />
            <p className="ms-6 text-lg">{user?.member.email}</p>
          </div>
        </div>
      </div>
    )
  );
}
