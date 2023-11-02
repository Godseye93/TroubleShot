import CardContent from "@/components/CardContentS";

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
      date: "2023-01-10",
    },
    {
      seq: 2,
      title: "오류고쳐주세용 제바알!!!",
      content:
        "하하하 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아 길게적어야함아아아아아아아아아아아아아아아ㅏㅇ아아아아ㅏ아아아아ㅏ아아아아아ㅏ아아아아아아",
      tags: ["java", "python", "python", "python", "python", "python", "python", "python", "python", "python"],
      views: 1234,
      comments: 123459,
      likes: 4561238,
      date: "2023-01-22",
    },
    {
      seq: 3,
      title: "오류고쳐주세용 제바알!!!",
      content:
        "하하하 길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아길게적어야함아아아아아아아아아아아아아아아ㅏㅇ아아아아ㅏ아아아아ㅏ아아아아아ㅏ아아아아아아",
      tags: [
        "java",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
        "python",
      ],
      views: 1234,
      comments: 453,
      likes: 123,
      img: "https://pbs.twimg.com/media/D44RMeiUwAAn_1F.jpg",
      date: "2023-01-31",
    },
  ];

  return (
    <div className="mt-4 lg:block hidden">
      <CardContent keyword={tmpkeyword} contents={tempdata} />
    </div>
  );
}
