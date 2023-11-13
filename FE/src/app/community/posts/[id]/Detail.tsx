"use client";
import { getTroubleDetail, postAnswer, postTroubleLike } from "@/api/trouble";
import Tagbox from "@/components/TagBox";
import { useLoginStore } from "@/stores/useLoginStore";
import { changeKoTime } from "@/utils/getTimeAgo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import UiwEditor from "@/components/Create/UiwEditor";
import AnswerPost from "./AnswerPost";
import CreateComment from "@/components/CreateComment";

export default function Detail({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { user } = useLoginStore();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };
  const onLike = async () => {
    if (!user) return toast.error("로그인이 필요합니다.");
    try {
      const res = await postTroubleLike(user.member.seq, board!.seq, user.member.seq);
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ["detail"],
        exact: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["detail"],
    queryFn: async () => {
      const data = await getTroubleDetail(user!.member.seq, id);
      return data;
    },
  });
  const board = data?.troubleShooting;

  const [answerTitle, setAnswerTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const onPostAnswer = async () => {
    if (!user) return toast.error("로그인이 필요합니다");
    if (answerTitle.trim() === "") return toast.error("제목을 입력해 주세요");
    if (answerContent.trim() === "") return toast.error("내용을 입력해 주세요");
    try {
      await postAnswer(user!.member.seq, board!.seq, answerContent, answerTitle);
      queryClient.invalidateQueries({ queryKey: ["detail"], exact: true });
      toast.success("답변이 등록되었습니다");
      setAnswerTitle("");
      setAnswerContent("");
      setShowAnswerForm(false);
    } catch (err) {
      toast.error("답변 등록에 실패하였습니다");
      console.log(err);
    }
  };
  return (
    <>
      {board && (
        <>
          <div className="flex-1 bg-white rounded-lg shadow-md  p-7">
            <div className="flex justify-between items-center">
              <p className="text-sub text-lg">{board?.category}</p>
              <div className="text-2xl">
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="w-full line-clamp-1 text-2xl font-semibold mt-5">{board?.title}</div>
            <div className="flex gap-2 items-center mt-8 border-b-2 pb-5">
              <img
                src={board!.writer.profileImg}
                className="rounded-full shadow-md w-12 h-12"
                // height={40}
                // width={40}
                alt=""
              />
              <p className="font-semibold text-lg">{board?.writer.nickname}</p>
              <p className="text-sm">{changeKoTime(board!.createTime)}</p>
            </div>
            <div className="mt-12 max-w-[70vw]">
              <MDEditor.Markdown source={board?.context} />
            </div>
            <div className="mt-10">
              <Tagbox tags={board!.tags} />
            </div>
            <div className="mt-2 shadow-md rounded-lg">
              <div className="bg-main rounded-t-lg flex items-center ps-5 h-12 font-semibold mt-5">사용 기술 스택</div>
              <MDEditor.Markdown source={"```" + board.dependency + "```"} />
            </div>
            <div className=" border-b-2 pb-2 pt-10">
              <div className="flex  items-center gap-3 mt-5 text-xl">
                <div className="flex items-center max-w-[33%]  hover:cursor-pointer gap-2" onClick={onLike}>
                  {board.loginLike ? (
                    <div className="w-4 text-red-600">
                      <AiFillHeart />
                    </div>
                  ) : (
                    <div className="w-4 ">
                      <AiOutlineHeart />
                    </div>
                  )}
                  <p className=" line-clamp-1 items-center ">{board.likeCount}</p>
                </div>
                <div className="flex items-center max-w-[33%] gap-2">
                  <div className="w-4 ">
                    <AiOutlineEye />
                  </div>
                  <p className="line-clamp-1 items-center">{board.viewCount}</p>
                </div>
                <div className="flex items-center max-w-[33%] gap-2">
                  <div className="w-4 ">
                    <MdComment />
                  </div>
                  {board.replyCount > 0 ? (
                    <p className=" line-clamp-1 items-center hover:cursor-pointer" onClick={toggleComments}>
                      {board.replyCount}개의 답글 더보기
                    </p>
                  ) : (
                    <p className=" line-clamp-1 items-center">{board.replyCount}</p>
                  )}
                </div>
              </div>
              <div>
                <CreateComment />
              </div>
              {showComments && <div className="border-t-2">gkgk</div>}
            </div>

            <div className={`mt-5  px-3 border-black border rounded-lg min-h-16 ${showAnswerForm && "pb-5"}`}>
              <div
                className={`flex justify-between  items-center rounded-lg h-16 ${showAnswerForm && "border-b mb-5"}`}
              >
                <p>답변을 남겨주세요!</p>
                {!showAnswerForm && (
                  <button
                    onClick={() => setShowAnswerForm((prev) => !prev)}
                    className="bg-main hover:bg-amber-500 shadow-md hover:shadow-none transition-all duration-200 rounded-lg p-2"
                  >
                    답변하기
                  </button>
                )}
              </div>
              {showAnswerForm && (
                <div className="">
                  <input
                    type="text"
                    defaultValue={`답변 : ${board!.title}`}
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
            <div>
              {board.answers.map((answer, idx) => (
                <AnswerPost troubleSeq={board.seq} key={idx} answer={answer} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
