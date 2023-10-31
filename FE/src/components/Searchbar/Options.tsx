import { useState } from "react";
import Duration from "./Duration";
import InputTag from "./InputTag";
import { AiOutlineClose } from "react-icons/ai";
import SetOptions from "./SetOptions";

export default function Options() {
  const [tags, setTags] = useState<string[]>([]);
  const [selectAnswer, setSelectAnswer] = useState(0);
  const [selectSort, setSelectSort] = useState(0);
  const anwerOption = ["전체", "해결된 글", "미해결 글"];
  const sortOption = ["최신순", "좋아요 순", "댓글 순"];

  return (
    <div>
      <div className="mt-7 flex gap-2">
        <div className="max-w-[50%] border-r-2 pe-2">
          <Duration />
          <InputTag setTags={setTags} />
        </div>
        <div className="max-w-[25%] ps-2 border-r-2 pe-2">
          <SetOptions
            title="해결여부"
            options={anwerOption}
            selectedOption={selectAnswer}
            setSelectedOption={setSelectAnswer}
          />
        </div>
        <div className="max-w-[25%] ps-2">
          <SetOptions
            title="정렬 기준"
            options={sortOption}
            selectedOption={selectSort}
            setSelectedOption={setSelectSort}
          />
        </div>
      </div>

      <div className="flex w-full flex-wrap">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center px-2 border border-black border-opacity-25 py-1 rounded-full mt-3 shadow-md bg-silver me-2"
          >
            <p className="me-1">{tag}</p>
            <div
              className="hover:cursor-pointer hover:text-red-600"
              onClick={() => setTags(tags.filter((tagname, index) => index !== idx))}
            >
              <AiOutlineClose />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
