import BoardItem from "@/components/BoardItem";

interface user {
  username: string;
  userImg: string;
}
interface content {
  seq: number;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  content: string;
  img?: string;
  date: string;
  user: user;
}
interface props {
  contents: content[];
}
export default function BoardList({ contents }: props) {
  return (
    <div className="bg-white rounded-lg shadow-md px-2">
      {contents.map((content, idx) => (
        <BoardItem key={idx} board={content} idx={idx} last={contents.length - 1} />
      ))}
    </div>
  );
}
