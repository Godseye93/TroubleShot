import Image from "next/image";
import backgroundImage from "@/../public/background/loginBackground4.jpg";

export default function page() {
  return (
    <div className="fcc h-[100vh]">
      <Image src={backgroundImage} alt="backgroundImage" className="bg-cover h-screen absolute w-full -z-10" />
      <div className="bg-white rounded p-10 text-center shadow-md w-[25rem]">
        <h1 className="text-3xl border-b border-main">회원정보 수정</h1>
        <div className="my-4 text-left">
            <label className="text-gray-900 me-2">아이디(이메일)</label>
            <input
              type="text"
              className="border block w-full p-2 rounded me-2"
              id="TSnickname"
              placeholder="최소 2자 | 최대 10자까지 가능합니다."
            />
        </div>
        <div className="my-4 text-left">
            <label className="text-gray-900 me-2">아이디(이메일)</label>
            <input
              type="text"
              className="border block w-full p-2 rounded me-2"
              id="TSnickname"
              placeholder="최소 2자 | 최대 10자까지 가능합니다."
            />
        </div>
        <div className="my-4 text-left">
            <label className="text-gray-900 me-2">아이디(이메일)</label>
            <input
              type="text"
              className="border block w-full p-2 rounded me-2"
              id="TSnickname"
              placeholder="최소 2자 | 최대 10자까지 가능합니다."
            />
        </div>
        <div className="my-4 text-left">
            <label className="text-gray-900 me-2">아이디(이메일)</label>
            <input
              type="text"
              className="border block w-full p-2 rounded me-2"
              id="TSnickname"
              placeholder="최소 2자 | 최대 10자까지 가능합니다."
            />
        </div>
      </div>
    </div>
  );
}
