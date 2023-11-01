"use client";
import { useState } from 'react';
import Image from "next/image";
import trous_favicon_origin from "/public/logo/trous_favicon_origin.png"
import trous_favicon_black from "/public/logo/trous_favicon_black.png"
import trous_favicon_white from "/public/logo/trous_favicon_white.png"

export default function FeatureIntro() {
    type MyTabType = 1 | 2 | 3

    type MyTabMap = {
        [key:string] : MyTabType
    }
    
    const MY_TAB: MyTabMap = {
        기능1: 1,
        기능2: 2,
        기능3: 3,
    }
    
    const [content, setContent] = useState<MyTabType>(MY_TAB.기능1);

    let contentsFile = trous_favicon_origin;

    if ( content == 1 ) {
        contentsFile = trous_favicon_origin
    } else if ( content == 2 ) {
        contentsFile = trous_favicon_black
    } else if ( content == 3 ) {
        contentsFile = trous_favicon_white
    }


    return (
        <div id='featureIntro' className="flex flex-col items-center mt-28">
            <h1 className="text-5xl">트러블 샷의 주요 기능</h1>
            <div className="flex w-full h-96 justify-center mt-20">
                <section className="flex flex-col items-center justify-between w-3/12">
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc"
                    onClick={() => setContent(MY_TAB.기능1)}>
                        <div>기능 1</div>
                    </div>
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc"
                    onClick={() => setContent(MY_TAB.기능2)}>
                        <div>기능 2</div>
                    </div>
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc"
                    onClick={() => setContent(MY_TAB.기능3)}>
                        <div>기능 3</div>
                    </div>
                </section>
                <div className=" bg-main w-6/12 rounded-lg fcc"><Image src={contentsFile} alt=''/><div>기능 소개 영상 들어가야 함</div></div>
            </div>
        </div>
    );
}
