import Image from "next/image";
import Link from "next/link";

import Stars from "@/components/home/stars";
import main_logo from "/public/logo/logo-no-background.png";
import chrome_logo from "/public/logo/chrome_logo.png";
import intelliJ_logo from "/public/logo/intelliJ_logo.png";
import vscode_logo from "/public/logo/vscode_logo.png";

export default function FirstIntro() {
  return (
    <div id="firstIntro" className="flex flex-col items-center mt-20">
      <Stars />
      <h1 className=" mb-10 text-3xl">트러블 슈팅의 완벽한 파트너</h1>
      <Image src={main_logo} alt="trouble-shot" className=" w-9/12" />
      <div className="flex flex-col items-center w-full mt-10">
        <Link href="#" className=" mb-3 w-5/12 bg-gray-500 flex justify-center items-center text-2xl p-3 hvc">
          with VSC <Image src={vscode_logo} alt="vscode_logo" className=" w-10 ml-5" />
        </Link>
        <Link href="#" className=" mb-3 w-5/12 bg-gray-500 flex justify-center items-center text-2xl p-3 hvc">
          with IntelliJ <Image src={intelliJ_logo} alt="intelliJ_logo" className=" w-10 ml-5" />
        </Link>
      </div>
    </div>
  );
}
