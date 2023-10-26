import Image from "next/image";
import browser_icon from "/public/browser_icon.png";

export default function Home() {
  const id = "2";
  return (
    <main className=" flex flex-col gap-4 items-center">
      <Image src={browser_icon} alt="" />
    </main>
  );
}
