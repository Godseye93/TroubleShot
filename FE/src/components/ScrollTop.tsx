"use client";

import { MdKeyboardArrowUp } from "react-icons/md";

export default function ScrollTop() {
  const onScroll = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="w-16 h-16  shadow-md flex justify-center items-center text-4xl rounded-full fixed bottom-10 right-10 bg-main duration-200 transition-all hover:bg-softmain hover:cursor-pointer"
      onClick={onScroll}
    >
      <MdKeyboardArrowUp />
    </div>
  );
}
