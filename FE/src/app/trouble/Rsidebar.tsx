import CardContent from "@/components/CardContent";

export default function Rsidebar() {
  const tmpkeyword = "javascript";
  const tempdata = [
    {
      seq: 1,
      title: "오류고쳐주세용",
      content:
        "웹빨리끝내자구 길게적어야함아아아아아아아아아아아아아아아ㅏㅇ아아아아ㅏ아아아아ㅏ아아아아아ㅏ아아아아아아",
      tags: ["javastript", "typescript"],
      views: 1234,
      comments: 123459,
      likes: 456125616549838,
    },
    {
      seq: 2,
      title: "오류고쳐주세용 제바알!!!",
      content: "하하하 길게적어야함아아아아아아아아아아아아아아아ㅏㅇ아아아아ㅏ아아아아ㅏ아아아아아ㅏ아아아아아아",
      tags: ["java", "python", "python", "python", "python", "python", "python", "python", "python", "python"],
      views: 1234,
      comments: 123459,
      likes: 4561238,
    },
    {
      seq: 3,
      title: "오류고쳐주세용 제바알!!!",
      content: "하하하 길게적어야함아아아아아아아아아아아아아아아ㅏㅇ아아아아ㅏ아아아아ㅏ아아아아아ㅏ아아아아아아",
      tags: ["java", "python", "python", "python", "python", "python", "python", "python", "python", "python"],
      views: 1234,
      comments: 453,
      likes: 123,
    },
  ];

  return (
    <div className="mt-4">
      <CardContent keyword={tmpkeyword} contents={tempdata} />
    </div>
  );
}
