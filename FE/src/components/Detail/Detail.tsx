"use client";
import { getTroubleDetail, postAnswer, postTroubleFavorite, postTroubleLike } from "@/api/trouble";
import Tagbox from "@/components/TagBox";
import { useLoginStore } from "@/stores/useLoginStore";
import { changeKoTime } from "@/utils/getTimeAgo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import UiwEditor from "@/components/Create/UiwEditor";
import AnswerPost from "./AnswerPost";
import CreateComment from "@/components/CreateComment";
import { useRouter } from "next/navigation";
import CommentItem from "@/components/CommentItem";
import BoardMenu from "./BoardMenu";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { checkWriterImg, checkWriterName } from "@/utils/nullWriter";
import Link from "next/link";
import { TbRobot } from "react-icons/tb";
import AnswerAi from "./AnswerAi";
import { newLine } from "@/utils/newLine";

export default function Detail({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useLoginStore();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };
  const onLike = async () => {
    if (!user) return toast.error("로그인이 필요합니다.");
    try {
      await postTroubleLike(user.member.seq, board!.seq, user.member.seq);
      queryClient.invalidateQueries({
        queryKey: ["detail", id],
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["detail", id],
    queryFn: async () => {
      const data = await getTroubleDetail(user ? user.member.seq : null, id);
      return data;
    },
  });
  const board = data?.troubleShooting;
  const [answerTitle, setAnswerTitle] = useState(board?.title);
  useEffect(() => {
    if (board) setAnswerTitle(board.title);
  }, [board]);
  const [answerContent, setAnswerContent] = useState("");
  const onPostAnswer = async () => {
    if (!user) {
      router.push("/login");
      await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기 작업을 기다림
      toast.warn("로그인이 필요합니다");
      return;
    }

    if (answerTitle!.trim() === "") return toast.error("제목을 입력해 주세요");
    if (answerContent.trim() === "") return toast.error("내용을 입력해 주세요");
    try {
      await postAnswer(user!.member.seq, board!.seq, answerContent, answerTitle!);
      queryClient.invalidateQueries({ queryKey: ["detail", id], exact: true });
      toast.success("답변이 등록되었습니다");
      setAnswerTitle("");
      setAnswerContent("");
      setShowAnswerForm(false);
    } catch (err) {
      toast.error("답변 등록에 실패하였습니다");
      console.log(err);
    }
  };
  const onBookmark = async () => {
    if (!user) return toast.error("로그인이 필요합니다");
    if (board) {
      try {
        await postTroubleFavorite(user.member.seq, board.seq);
        if (!board.favorite) toast.success("북마크에 저장되었습니다");
        else if (board.favorite) toast.success("북마크에서 제거되었습니다");
        await queryClient.invalidateQueries({
          queryKey: ["detail", id],
          exact: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {board && (
        <>
          <div className="flex-1 bg-white rounded-lg shadow-md  p-7">
            <div className="flex justify-between items-center">
              <p className="text-sub text-lg font-semibold">{board.category}</p>
              {board.writer && user?.member.seq === board.writer.seq && (
                <div className="text-2xl me-5">
                  <BoardMenu troubleSeq={board.seq} userSeq={user.member.seq} />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 line-clamp-1 text-2xl font-semibold mt-5">{board.title}</div>
              <div
                className={`inline-block text-xl font-semibold py-1 px-3 rounded-full shadow-md ${
                  board.solved ? "bg-main" : "bg-sub text-white"
                }`}
              >
                {board.solved ? "해결됨" : "미해결"}
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-8 border-b-2 pb-5">
              <Link href={board.writer ? `/mypage/${board.writer.seq}` : ""}>
                <div className="flex gap-2 items-center ">
                  <img
                    src={checkWriterImg(board.writer)}
                    className="rounded-full shadow-md w-12 h-12"
                    // height={40}
                    // width={40}
                    alt=""
                  />
                  <p className="font-semibold text-lg">{checkWriterName(board.writer)}</p>
                  <p className="text-sm">{changeKoTime(board!.createTime)}</p>
                </div>
              </Link>
              <div className="me-5 text-4xl" onClick={onBookmark}>
                {!user || !board.favorite ? (
                  <button className=" hover:text-main transition-all hover:shadow-md duration-200">
                    <BsBookmarkStar />
                  </button>
                ) : (
                  <button className=" text-main transition-all hover:shadow-md duration-200 hover:text-sub">
                    <BsBookmarkStarFill />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-12 max-w-[63vw]">
              <MDEditor.Markdown source={board?.context} />
            </div>
            {board.tags.length > 0 && (
              <div className="mt-10">
                <Tagbox tags={board!.tags} />
              </div>
            )}
            {board.dependency && board.dependency.trim().length > 0 && (
              <div className="mt-2 shadow-md rounded-lg">
                <div className="bg-main rounded-t-lg flex items-center ps-5 h-12 font-semibold mt-5">
                  사용 기술 스택
                </div>
                <MDEditor.Markdown className="max-w-[65vw]" source={"```ts\n" + newLine(board.dependency) + "\n```"} />
              </div>
            )}

            {user && board.writer?.seq === user.member.seq && (
              <AnswerAi userSeq={user.member.seq} context={board.context} />
            )}

            <div className=" border-b-2 pb-2 pt-10">
              <div className="flex  items-center gap-3 mt-5 text-xl">
                <div
                  className="flex items-center max-w-[33%]  hover:cursor-pointer gap-2 border-sub text-sub rounded-lg px-2 border"
                  onClick={onLike}
                >
                  {board.loginLike ? (
                    <div className="w-4 text-red-600 hover:text-red-400 transition-colors duration-200">
                      <AiFillHeart />
                    </div>
                  ) : (
                    <div className="w-4 hover:text-red-400 transition-colors duration-200">
                      <AiOutlineHeart />
                    </div>
                  )}
                  <p className=" line-clamp-1 items-center ">{board.likeCount}</p>
                </div>
                <div className="flex items-center max-w-[33%] gap-2 border-green-600 text-green-600 rounded-lg px-2 border">
                  <div className="w-4 ">
                    <AiOutlineEye />
                  </div>
                  <p className="line-clamp-1 items-center">{board.viewCount}</p>
                </div>
                <div className="flex items-center max-w-[33%] gap-2 border-amber-600 text-amber-600 rounded-lg px-2 border">
                  <div className="w-4 ">
                    <MdComment />
                  </div>
                  {board.replyCount > 0 ? (
                    <p className=" line-clamp-1 items-center hover:cursor-pointer" onClick={toggleComments}>
                      {board.replyCount}
                      <span className="text-base font-semibold hover:text-main transition-all duration-200">
                        {showComments ? " 댓글 숨기기" : "개의 댓글 더보기"}
                      </span>
                    </p>
                  ) : (
                    <p className=" line-clamp-1 items-center">{board.replyCount}</p>
                  )}
                </div>
              </div>
              <div>
                <CreateComment troubleSeq={board.seq} />
              </div>
              <div>
                {showComments && (
                  <div className={`${board.replyCount > 0 && "border-t-2"} mt-5 waterfall-comments`}>
                    {board.replies?.map((comment, idx) => (
                      <CommentItem key={idx} comment={comment} userSeq={user?.member.seq} troubleSeq={board.seq} />
                    ))}
                    <div
                      className="mt-5 pt-5 border-t-2 flex justify-center items-start text-xl font-semibold w-full rounded-md hover:text-main hover:cursor-pointer duration-200 transition-colors"
                      onClick={() => setShowComments(false)}
                    >
                      닫기
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!board.solved && (
              <div
                className={`mt-5 ${
                  !showAnswerForm && "bg-sub text-white"
                }    px-3 shadow-md border rounded-lg min-h-16 ${showAnswerForm && "pb-5"}`}
              >
                <div
                  className={`flex justify-between  items-center rounded-lg h-16 ${showAnswerForm && "border-b mb-5"}`}
                >
                  <p className=" font-semibold text-lg">답변을 남겨주세요!</p>
                  {!showAnswerForm && (
                    <button
                      onClick={() => setShowAnswerForm((prev) => !prev)}
                      className="bg-main hover:bg-amber-500 shadow-md hover:shadow-none transition-all duration-200 rounded-lg font-semibold text-black p-2"
                    >
                      답변하기
                    </button>
                  )}
                </div>
                {showAnswerForm && (
                  <div className="">
                    <input
                      type="text"
                      defaultValue={board!.title}
                      className="w-full text-xl font-semibold rounded-t-lg px-5 bg-slate-200 h-12 flex items-center"
                      onChange={(e) => setAnswerTitle(e.target.value)}
                    />
                    <UiwEditor markdown={answerContent} setMarkdown={setAnswerContent} />
                    <div className="flex gap-2 justify-end items-center mt-5">
                      <button
                        className="rounded-lg bg-sub text-white shadow-md p-2 hover:shadow-sm hover:bg-pink-700 transition-all duration-200 relative"
                        onClick={() => setShowAnswerForm(false)}
                      >
                        닫기
                      </button>

                      <button
                        className="rounded-lg bg-main shadow-md p-2 hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
                        onClick={onPostAnswer}
                      >
                        등록
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <p className="text-2xl font-semibold mt-7">총 {board.answerCount}개의 답변</p>

            <div>
              {board.answers.map((answer, idx) => (
                <AnswerPost
                  troubleSeq={board.seq}
                  key={idx}
                  answer={answer}
                  boardWriterSeq={board.writer ? board.writer.seq : null}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
