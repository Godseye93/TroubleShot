import Image from "next/image";
import blackLogo from "../../public/logo/trous_withoutLogo_black.png"

export default function Footer() {
  return (
    <div className="flex w-full border-t-2 border-gray-400">
      <ul>
        <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
        <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
        <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
      </ul>
      <div className="flex">
        <ul>
            <li><div className="">오리엔탈 샐러드</div></li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
            <li>정슬호</li>
        </ul>
        <ul>
            <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
            <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
            <li><Image src={blackLogo} alt="" className="w-2/12"/></li>
        </ul>
      </div>
    </div>
  );
}
