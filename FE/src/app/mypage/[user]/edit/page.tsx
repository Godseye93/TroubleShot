"use client";
import { useLoginStore } from "@/stores/useLoginStore";
import { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { putUserInfo } from "@/api/account";
import { EditReq } from "@/types/CommonType";
import FileUploader from "@/components/Create/FileUploader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function page() {
  const { user, editStoreNickname, changeProfileImg } = useLoginStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [nickname, setNickname] = useState("");
  const [showFileUploader, setShowFileUploader] = useState(false);

  const userData = user?.member;

  const showFileUploaderModal = () => {
    setShowFileUploader(true);
  };

  const editprofileImg = async (url_key: string) => {
    const params: EditReq = {
      userSeq: userData!.seq,
      reqBody: {
        loginSeq: userData!.seq,
        type: 0,
        memberDTO: {
          seq: userData!.seq,
          email: userData!.email,
          profileImg: url_key,
          nickname: userData!.nickname,
          locale: userData!.locale,
        },
      },
    };
    try {
      const res = await putUserInfo(params);
      if (res === "success") {
        changeProfileImg(url_key!);
        // 토스트 띄우고 마이페이지로 돌아가기
        toast.success("프로필 사진 변경 성공 !");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handle = {
    close: () => {
      setShowFileUploader(false);
    },
    execute: () => {},
    onUploadComplete: editprofileImg,
  };

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
          toast.success("닉네임 변경 성공 !");
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

  return mounted ? (
    <div className="fcc flex-col h-[100vh] mt-6">
      <div className="bg-white absolute top-1/3 z-10">{showFileUploader && <FileUploader handle={handle} />}</div>
      <div className="bg-white text-center shadow-md w-2/4 rounded-lg overflow-hidden mb-2">
        <div className="w-full bg-main p-3">
          <p className="text-xl">회원정보 수정</p>
        </div>
        <div className="w-full">
          <div className=" fcc">
            <div className="relative fcc overflow-hidden my-2">
              <img src={user?.member.profileImg} alt="trosProfileImg" className="rounded-full w-60 h-60" />
              <span
                className="absolute bottom-1 right-3 bg-main p-4 rounded-full cursor-pointer"
                onClick={showFileUploaderModal}
              >
                <MdOutlineModeEditOutline />
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold mb-3">{user?.member.nickname}</p>
        </div>
      </div>
      <div className="flex flex-col bg-white shadow-md w-2/4 rounded-lg overflow-hidden">
        <div className="flex w-full items-center justify-between border-b border-gray-300">
          <BsPerson className="text-3xl m-3" />
          <input className="text-lg w-2/5" placeholder="수정할 닉네임" onChange={(e) => setNickname(e.target.value)} />
          <div onClick={editNickname} className="bg-gray-300 rounded-lg text-center me-2 p-1 cursor-pointer">
            수정
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <AiOutlineMail className="text-2xl mx-4 my-3" />
          <p className="text-lg text-left w-2/5">{user?.member.email}</p>
          <div className="me-2 p-1 w-1"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="fcc flex-col h-[100vh] mt-6">
      <div className="bg-white text-center shadow-md w-2/4 rounded-lg overflow-hidden mb-2">
        <div className="w-full bg-main p-6"></div>
        <div className="w-full">
          <div className="fcc flex-col p-3">
            <Skeleton width={260} height={260} circle={true} />
            <Skeleton width={150} height={30} />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white shadow-md w-2/4 rounded-lg overflow-hidden">
        <div className="flex w-full items-center justify-center border-b border-gray-300 p-2">
          <Skeleton width={400} height={40} />
        </div>
        <div className="flex w-full items-center justify-center border-b border-gray-300 p-2">
          <Skeleton width={400} height={40} />
        </div>
      </div>
    </div>
  );
}
