import Link from "next/link";
import Image from "next/image";
import trous_logo_origin from "/public/logo/trous_logo_origin.png";


export default function Header() {
    return (
        <div className='bg-white rounded-lg flex text-xl justify-between fixed top-1 left-2 right-2'>
            <div className='flex items-center'>
                <Link href="/" className=" w-2/12 h-2/12 mx-3"><Image src={trous_logo_origin} alt="" /></Link>
                <Link href="/trouble/1" className='me-5 text-black'>내 트러블 슈팅</Link>
                <Link href="/community" className='me-5 text-black'>커뮤니티</Link>
            </div>
            <div className="p-3">
            <button className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">로그인</button>
            </div>
        </div>
    );
}
