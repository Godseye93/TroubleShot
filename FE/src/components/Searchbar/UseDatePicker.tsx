"use client";
import { forwardRef } from "react";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { ko } from "date-fns/locale";

export default function UseDatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const years = Array.from({ length: getYear(new Date()) + 1 - 1900 }, (_, i) => getYear(new Date()) - i);
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const CustomInput = forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <div onClick={onClick} ref={ref}>
        {value}
      </div>
    )
  );
  CustomInput.displayName = "CustomInput";
  return (
    <DatePicker
      maxDate={new Date()}
      dateFormat="yyyy년 MM월 dd일"
      selected={date}
      onChange={(date) => {
        setDate(date!);
      }}
      customInput={<CustomInput />}
      locale={ko}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="bg-main h-8 flex justify-center">
          <button className="me-3" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <AiFillCaretLeft size="20" />
          </button>
          <select
            className="text-base bg-main"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}년
              </option>
            ))}
          </select>

          <select
            className="text-base bg-main"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => {
              changeMonth(months.indexOf(value));
            }}
          >
            {months.map((option) => (
              <option key={option} value={option} className="bg-main">
                {option}
              </option>
            ))}
          </select>

          <button className="ms-3" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <AiFillCaretRight size="20" />
          </button>
        </div>
      )}
    />
  );
}
