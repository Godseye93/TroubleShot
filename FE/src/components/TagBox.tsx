import { AiFillTag } from "react-icons/ai";

export default function Tagbox({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 line-clamp-1 my-2 items-center">
      <div className="flex items-center">
        <AiFillTag />
      </div>
      {tags.map((tag, idx) => (
        <div key={idx} className="bg-silver rounded-lg text-xs shadow-lg text-center p-1 min-w-[2rem] ">
          {tag}
        </div>
      ))}
    </div>
  );
}
