"use client";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import IconBox from "./IconBox";
import { GetTroubleList, TroubleShootingBoard } from "@/types/TroubleType";
import { removeHtmlAndMarkdownTags } from "@/utils/removeHtmlAndMarkdownTags";
import { getImageLink } from "@/utils/getImageLink";
import Tagbox from "./TagBox";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { useLoginStore } from "@/stores/useLoginStore";
import { postTroubleFavorite } from "@/api/trouble";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
// interface SetQueryType {
//   pages: GetTroubleList[];
//   // 다른 필드들도 필요에 따라 추가
// }

export default function BoardItem({
  nowUrl,
  board,
  last,
  idx,
  queryKey,
}: {
  board: TroubleShootingBoard;
  last: number;
  idx: number;
  queryKey: string;
  nowUrl: string;
}) {
  const imgList = getImageLink(board.context);
  const { user } = useLoginStore();
  const queryClient = useQueryClient();
  const content = removeHtmlAndMarkdownTags(board.context).slice(0, 500);
  // const { mutate } = useMutation(["boards"], {
  //   mutationFn: async () => {
  //     if (!user) return toast.error("로그인이 필요합니다");
  //     try {
  //       await postTroubleFavorite(user.member.seq, board.seq);
  //       if (!board.favorite) toast.success("북마크에 저장되었습니다");
  //       else if (board.favorite) toast.success("북마크에서 제거되었습니다");
  //       console.log(board.favorite);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   onMutate: async () => {
  //     const oldData = queryClient.getQueryData(["boards"]);
  //     console.log("oldData: ", oldData);
  //     // 우리 update overwrite하지 않기 위해 미리 취소
  //     await queryClient.cancelQueries(["boards"]);
  //     // 미리 UI에 적용시켜 놓음
  //     queryClient.setQueryData(["boards"], "");
  //     // 만약 에러나서 롤백 되면 이전 것을 써놓음.
  //     return () => queryClient.setQueryData(["boards"], oldData);
  //   },
  //   // onError: (error, variable, rollback) => {
  //   //   if (rollback) rollback();
  //   //   else console.log(error);
  //   // },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["boards"]);
  //   },
  // });

  const onBookmark = async () => {
    if (!user) return toast.error("로그인이 필요합니다");
    try {
      await postTroubleFavorite(user.member.seq, board.seq);
      if (!board.favorite) toast.success("북마크에 저장되었습니다");
      else if (board.favorite) toast.success("북마크에서 제거되었습니다");
      await queryClient.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });

      // queryClient.setQueryData([queryKey], (data: SetQueryType) => {
      //   ({
      //     ...data,
      //     pages: data.pages.map((page) => ({
      //       ...page,
      //       troubleShootingList: page.troubleShootingList.map((content) => {
      //         console.log(content.seq === board.seq);
      //         return content.seq === board.seq ? { ...content, favorite: !board.favorite } : board;
      //       }),
      //     })),
      //   });
      //   console.log(data);
      // });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`${idx !== last && "border-b-2"} py-4 mt-2 w-full flex justify-center px-4`}>
      {/* 상단바 */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={board.writer.profileImg} className="rounded-full w-10 h-10 shadow-md" />
            <p className="mx-2 font-semibold">{board.writer.nickname}</p>
            <p className="text-xs">{getTimeAgo(board.createTime)}</p>
          </div>
          <div
            className="text-center me-2"
            onClick={() => {
              onBookmark();
            }}
          >
            {!user || !board.favorite ? (
              <button className="text-2xl hover:text-main transition-all hover:shadow-md duration-200">
                <BsBookmarkStar />
              </button>
            ) : (
              <button className="text-2xl text-main transition-all hover:shadow-md duration-200 hover:text-sub">
                <BsBookmarkStarFill />
              </button>
            )}
            {board.solved ? <p className="text-blue-500">해결 완료</p> : <p className="text-red-500">미해결</p>}
          </div>
        </div>
        {/* 중단 */}
        <Link href={`/${nowUrl + "/" + board.seq}`}>
          <div className=" hover:bg-slate-100 rounded-md duration-300 transition-all">
            <div className="text-lg font-semibold px-1">{board.title}</div>
            <div className="flex items-center justify-between ">
              <div
                className={`text-sm text-start mt-2 h-full px-1 max-w-[60vw]   ${
                  imgList.length === 0 ? "line-clamp-2" : "line-clamp-6"
                } `}
              >
                <span>{content}</span>
              </div>
              {imgList.length > 0 && (
                <div className="w-72">
                  <img src={imgList[0]} className="rounded-lg" alt="" />
                </div>
              )}
            </div>
            {board.tags.length > 0 && <Tagbox tags={board.tags} />}
          </div>
        </Link>
        <div className="mt-3 text-lg">
          <IconBox
            queryKey={queryKey}
            m={"me-1"}
            comments={board.replyCount}
            likes={board.likeCount}
            views={board.viewCount}
            isLike={board.loginLike}
            troubleSeq={board.seq}
          />
        </div>
      </div>
    </div>
  );
}
