import Link from "next/link";
import { FaPen } from "react-icons/fa";
import CategoryBtn from "./CategoryBtn";
import { AiFillPlusCircle } from "react-icons/ai";
interface Props {
  menus: JSX.Element[];
  categorys?: string[];
  link: string;
}

export default function Sidebar({ menus, categorys, link }: Props) {
  return (
    <div className="w-[14%] h-[91vh] bg-white shadow-lg mt-4 rounded-lg pt-5  flex-col justify-between text-lg md:flex hidden">
      <div>
        {menus.map((menu, idx) => (
          <div key={idx}>{menu}</div>
        ))}
        {categorys && (
          <div>
            <CategoryBtn categorys={categorys} />
          </div>
        )}
      </div>
      <div className="flex-col items-center flex">
        {categorys && (
          <div className="w-full fcc">
            <button className="fcc bg-sub text-white rounded-full w-3/4 h-10  shadow-red-600 shadow-md mb-5 flex hover:shadow-md hover:bg-red-600 transition-all">
              <AiFillPlusCircle />
              <p className="ms-2 line-clamp-1">카테고리 추가</p>
            </button>
          </div>
        )}
        <Link
          href={`${link}/create`}
          className="fcc bg-main rounded-full h-10 w-3/4 shadow-orange-700 shadow-md mb-10 flex hover:shadow-md hover:bg-yellow-500 transition-all"
        >
          <FaPen />
          <p className="ms-2">글쓰기</p>
        </Link>
      </div>
    </div>
  );
}
