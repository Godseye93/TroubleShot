import Image from "next/image";
import Link from "next/link";

import Stars from "@/components/home/stars";
import main_logo from "/public/logo/logo-no-background.png";
import intelliJ_logo from "/public/logo/intelliJ_logo.png";
import vscode_logo from "/public/logo/vscode_logo.png";

export default function FirstIntro() {
  const handleClick = () => {
    alert("마켓 승인 심사 중 입니다 !!");
  };

  return (
    <div id="firstIntro" className="flex flex-col items-center mt-20">
      <Stars />
      <h1 className=" mb-10 text-3xl">트러블 슈팅의 완벽한 파트너</h1>
      <Image src={main_logo} alt="trouble-shot" className=" w-9/12 z-50" />
      <div className="flex flex-col items-center w-full mt-10">
        <Link
          target="_blank"
          href="https://marketplace.visualstudio.com/items?itemName=wjdtmfgh.trouble-shot"
          className=" mb-3 w-5/12 bg-gray-500 flex justify-center items-center text-2xl p-3 hvc z-50"
        >
          with VSC <Image src={vscode_logo} alt="vscode_logo" className=" w-10 ml-5" />
        </Link>
        <Link
          onClick={handleClick}
          href="#"
          className=" mb-3 w-5/12 bg-gray-500 flex justify-center items-center text-2xl p-3 hvc z-50"
        >
          with IntelliJ <Image src={intelliJ_logo} alt="intelliJ_logo" className=" w-10 ml-5 " />
        </Link>
      </div>
    </div>
  );
}
