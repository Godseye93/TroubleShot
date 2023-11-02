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
        <div id='featureIntro' className="w-full flex flex-col items-center">
            <h1 className="text-4xl">트러블 샷의 주요 기능</h1>
            <div className="flex mt-16 w-full justify-center">
                <div className="w-3/12 flex flex-col items-center">
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc mb-10"
                    onClick={() => setContent(MY_TAB.기능1)}>
                        <div>기능 1</div>
                    </div>
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc mb-10"
                    onClick={() => setContent(MY_TAB.기능2)}>
                        <div>기능 2</div>
                    </div>
                    <div 
                    className="bg-main hover:bg-orange-600 duration-300 w-5/12 h-[70px] text-2xl rounded-lg fcc"
                    onClick={() => setContent(MY_TAB.기능3)}>
                        <div>기능 3</div>
                    </div>
                </div>
                <div className=" bg-main w-5/12 rounded-lg fcc"><Image src={contentsFile} alt=''/><div>기능 소개 영상 들어가야 함</div></div>
            </div>
        </div>
    );
}
