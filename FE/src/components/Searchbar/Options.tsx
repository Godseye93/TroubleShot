import { SetStateAction, useEffect, useState } from "react";
import Duration from "./Duration";
import InputTag from "./InputTag";
import { AiOutlineClose } from "react-icons/ai";
import SetOptions from "./SetOptions";
import { SearchParams } from "@/types/TroubleType";
import { useLoginStore } from "@/stores/useLoginStore";
interface Props {
  propsSetOption: React.Dispatch<SetStateAction<SearchParams>>;
}
export default function Options({ propsSetOption }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [selecSolved, setSelecSolved] = useState<number>(0);
  const [selectSort, setSelectSort] = useState(0);
  const anwerOption = ["전체", "해결된 글", "미해결 글"];
  const sortOption = ["최신순", "좋아요 순", "댓글 순", "조회순"];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    propsSetOption({
      tags: tags,
      order: selectSort,
      ...(selecSolved !== 0 && { solved: selecSolved === 1 ? true : false }),
      ...(isSelected && {
        startTime: startDate.toISOString().slice(0, -1),
        endTime: endDate.toISOString().slice(0, -1),
      }),
    });
  }, [tags, selectSort, selecSolved, isSelected, startDate, endDate]);

  return (
    <div>
      <div className="mt-7 flex gap-2">
        <div className="w-[50%] border-r-2 pe-2">
          <Duration
            startDate={startDate}
            endDate={endDate}
            isSelected={isSelected}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setIsSelected={setIsSelected}
          />
          <InputTag setTags={setTags} showTitle />
        </div>
        <div className="w-[25%] ps-2 border-r-2 pe-2">
          <SetOptions
            title="해결여부"
            options={anwerOption}
            selectedOption={selecSolved}
            setSelectedOption={setSelecSolved}
          />
        </div>
        <div className="w-[25%] ps-2">
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
