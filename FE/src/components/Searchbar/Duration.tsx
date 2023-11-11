import { SetStateAction, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCalendarFill } from "react-icons/bs";
import UseDatePicker from "./UseDatePicker";
interface Props {
  startDate: Date;
  endDate: Date;
  isSelected: boolean;
  setStartDate: React.Dispatch<SetStateAction<Date>>;
  setEndDate: React.Dispatch<SetStateAction<Date>>;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>;
}
export default function Duration({ startDate, endDate, isSelected, setStartDate, setEndDate, setIsSelected }: Props) {
  return (
    <div className="flex border-b-2 pb-5">
      <div className="w-20 font-semibold">기간별</div>
      <div>
        <button
          className={`option-btn ${!isSelected && "bg-main font-semibold shadow-md"}`}
          onClick={() => setIsSelected(false)}
        >
          전체
        </button>
        <div className="flex items-center mt-2">
          <button
            className={`option-btn ${isSelected && "bg-main font-semibold shadow-md"}`}
            onClick={() => setIsSelected(true)}
          >
            기간
          </button>
          <div className="flex border-2 pe-2  rounded-lg text-sm items-center ms-1">
            <div className="ms-2">
              <BsFillCalendarFill />
            </div>
            <div className="hover:bg-softestmain hover:cursor-pointer transition-colors duration-300 rounded-md py-1 px-2">
              <UseDatePicker date={startDate} setDate={setStartDate} />
            </div>
            <p className="mx-1"> ~ </p>
            <div className="hover:bg-softestmain hover:cursor-pointer transition-colors duration-300 rounded-md py-1 px-2">
              <UseDatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
