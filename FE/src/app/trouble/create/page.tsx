"use client";
import UiwEditor from "@/components/Create/UiwEditor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Options from "@/components/Create/Options";
import { CreateOptions } from "@/types/TroubleType";
export default function Page() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<CreateOptions>({
    category: "",
    scope: 0,
    tags: [],
  });

  const categorys = ["java", "ts", "react"];
  return (
    <div className="flex-1 me-2  min-h-[91vh]">
      <div className="mt-4 w-full ms-2 ">
        <div className="flex-1 bg-white shadow-md rounded-lg flex justify-center h-full pt-5 pb-10">
          <div className=" w-4/5">
            <div className="w-full  flex justify-end mb-3 gap-2 relative">
              <button
                className="rounded-lg bg-sub text-white shadow-md p-2 hover:shadow-sm hover:bg-pink-700 transition-all duration-200 relative"
                onClick={() => router.back()}
              >
                돌아가기
              </button>

              <button
                className="rounded-lg bg-main shadow-md p-2 hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
                onClick={() => setShowOptions(true)}
              >
                작성완료
              </button>
              {/* {showOptions && ( */}
              <div className={`absolute ${showOptions ? "waterfall" : "waterfall2re"} z-50`}>
                <Options
                  options={options}
                  setOptions={setOptions}
                  categorys={categorys}
                  setShowOptions={setShowOptions}
                />
              </div>
              {/* )} */}
            </div>
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              className="bg-silver w-full border-2 rounded-t-lg p-2 shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <UiwEditor markdown={markdown} setMarkdown={setMarkdown} />
            <div className="mt-5 rounded-lg shadow-md w-full">
              <div className=" rounded-t-lg bg-main h-10 flex items-center ps-3 font-semibold">사용 기술스택</div>
              <textarea
                className="w-full min-h-[10rem] whitespace-pre-wrap p-3"
                placeholder={`ex)  "dependencies": {
                  "next": "13.5.6",
                  "react": "^18",
                }`}
                onChange={(e) => console.log(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
