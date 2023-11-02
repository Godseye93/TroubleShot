import BoardList from "@/app/trouble/BoardList";

export default function TroubleContents() {
  const temuser = [
    {
      username: "정슬호",
      userImg: "https://m.dokidokigoods.co.kr/web/product/big/202301/3f31955ad234d3a2a5dbfbd7a14701f1.jpg",
    },
    {
      username: "정슬호",
      userImg: "https://m.dokidokigoods.co.kr/web/product/big/202301/3f31955ad234d3a2a5dbfbd7a14701f1.jpg",
    },
    {
      username: "정슬호",
      userImg: "https://m.dokidokigoods.co.kr/web/product/big/202301/3f31955ad234d3a2a5dbfbd7a14701f1.jpg",
    },
  ];
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
      user: temuser[0],
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
      user: temuser[1],
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
      user: temuser[2],
    },
  ];
  return (
    <div className="mt-2">
      <BoardList contents={tempdata} />
    </div>
  );
}
