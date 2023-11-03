import BoardItem from "@/components/BoardItem";

interface User {
  username: string;
  userImg: string;
}
interface Content {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
  img?: string;
  date: string;
  user: User;
}
interface Props {
  contents: Content[];
}
export default function BoardList({ contents }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md px-2">
      {contents.map((content, idx) => (
        <BoardItem key={idx} board={content} idx={idx} last={contents.length - 1} />
      ))}
    </div>
  );
}
