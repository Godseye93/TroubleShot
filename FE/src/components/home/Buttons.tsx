import { PageObjArray } from "../../app/page"
import { cls } from "./cls";

interface IButtonsProps {
  pageObjArray: PageObjArray;
  currentPageNum: number;
  handlePointClick: (pageNum: number) => void;
}

const Buttons = (props: IButtonsProps) => {
  return (
    <>
      {props.pageObjArray.map((item, index) => {
        return (
          <div
            key={item.pageNum}
            className={cls(
              "w-4 h-4  rounded-full cursor-pointer transition-all",
              props.currentPageNum === item.pageNum ? "bg-main" : "bg-softestmain"
            )}
            onClick={() => {
              props.handlePointClick(item.pageNum);
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Buttons;