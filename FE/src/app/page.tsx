import Image from "next/image";
import main_logo from "/public/logo/logo-no-background.png";
import chrome_logo from "/public/logo/chrome_logo.png"
import intelliJ_logo from "/public/logo/intelliJ_logo.png"
import vscode_logo from "/public/logo/vscode_logo.png"

import styles from '../styles/Home.module.css';
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black">

      <main className="flex flex-col items-center gap-4 text-white">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`${styles.star} ${styles[`twinkle${i % 4 + 1}`]}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}

        <div className="flex flex-col items-center mb-10 w-10/12">
          <h1 className="mt-32 mb-10 text-3xl">트러블 슈팅의 완벽한 파트너</h1>
          <Image src={main_logo} alt="trouble-shot" className=" w-9/12" />
          <Link href="#" className=" mt-10 mb-3 w-1/4 bg-gray-500 flex justify-center items-center text-2xl p-3">with VSC <Image src={vscode_logo} alt="vscode_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-1/4 bg-gray-500 flex justify-center items-center text-2xl p-3">with IntelliJ <Image src={intelliJ_logo} alt="intelliJ_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-1/4 bg-gray-500 flex justify-center items-center text-2xl p-3">with Chrome <Image src={chrome_logo} alt="chrome_logo" className=" w-10 ml-5" /></Link>
        </div>
        <div className="flex flex-col items-center">
          <h1 className=" mt-32 text-7xl">트러블 샷의 주요 기능</h1>
          <div className="flex">
            <section className="flex flex-col">
              <div className=""><button>기능 1</button></div>
              <div className=""><button>기능 2</button></div>
              <div className=""><button>기능 3</button></div>
            </section>
            <div className=" bg-orange-300 w-[1000px]" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mt-32 mb-10 text-3xl">트러블 슈팅의 완벽한 파트너</h1>
          <Image src={main_logo} alt="trouble-shot" className=" w-9/12" />
          <Link href="#" className=" mt-10 mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with VSC <Image src={vscode_logo} alt="vscode_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with IntelliJ <Image src={intelliJ_logo} alt="intelliJ_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with Chrome <Image src={chrome_logo} alt="chrome_logo" className=" w-10 ml-5" /></Link>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mt-32 mb-10 text-3xl">트러블 슈팅의 완벽한 파트너</h1>
          <Image src={main_logo} alt="trouble-shot" className=" w-9/12" />
          <Link href="#" className=" mt-10 mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with VSC <Image src={vscode_logo} alt="vscode_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with IntelliJ <Image src={intelliJ_logo} alt="intelliJ_logo" className=" w-10 ml-5" /></Link>
          <Link href="#" className=" mb-3 w-72 bg-gray-500 flex justify-center items-center text-2xl p-3">with Chrome <Image src={chrome_logo} alt="chrome_logo" className=" w-10 ml-5" /></Link>
        </div>
      </main>
    </div>

  );
}
