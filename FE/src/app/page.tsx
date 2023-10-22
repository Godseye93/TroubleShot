import Image from "next/image";
import Link from "next/link";
import browser_icon from "/public/browser_icon.png";

export default function Home() {
  const id = "2";
  return (
    <main className=" flex flex-col gap-4 items-center">
      <Link href="/community">GO TO community</Link>

      <Link href="/trouble/1">GO TO trouble 1</Link>

      <Link href={`/trouble/${id}`}>GO TO trouble 2</Link>

      <Link href="/login">GO TO login</Link>

      <Image src={browser_icon} alt="" />
    </main>
  );
}
