"use client";
import UiwEditor from "@/components/Create/UiwEditor";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Options from "@/components/Create/Options";
import { CreateOptions } from "@/types/TroubleType";
import { toast } from "react-toastify";
import { getCategories, postTrouble } from "@/api/trouble";
import { useLoginStore } from "@/stores/useLoginStore";
import { useQuery } from "@tanstack/react-query";
export default function Page() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [dependency, setDependency] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const [options, setOptions] = useState<CreateOptions>({
    category: "",
    scope: null,
    tags: [],
    solved: null,
  });
  const [Changed, setChanged] = useState(false);
  const { user } = useLoginStore();
  const onSubmit = async () => {
    console.log(options.scope);
    if (title.trim() === "") return toast.error("제목을 입력해 주세요");
    if (markdown.trim() === "") return toast.error("내용을 입력해 주세요");
    if (options.category.trim() === "") return toast.error("카테고리를 선택해 주세요");
    if (options.solved === null) return toast.error("해결 여부를 선택해 주세요");
    if (options.scope === null) return toast.error("공개 범위를 선택해 주세요");
    const req = {
      loginSeq: user!.member.seq,
      type: 0 as const,
      troubleShooting: {
        title: title,
        category: options.category,
        context: markdown,
        dependency: dependency,
        scope: options.scope,
        writer: { seq: user!.member.seq },
        tags: options.tags,
        solved: options.solved,
        postType: 0 as const,
      },
    };
    try {
      await postTrouble(req)
        .then(() => {
          router.back();
        })
        .then(() => {
          toast.success("게시물이 등록되었습니다.");
        });
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!user) return;
      const data = await getCategories(user?.member.seq);
      return data;
    },
  });
  useEffect(() => {
    if (data) {
      const list = data.categoryList.map((category) => category.name);
      setCategories(list);
    }
  }, [data]);

  return (
    <div className="flex-1 me-2  min-h-[91vh]">
      <div className="mt-4 w-full ms-2 ">
        <div className="flex-1 bg-white shadow-md rounded-lg flex justify-center h-full pt-5 pb-10">
          <div className=" w-4/5">
            <div className="w-full  flex justify-end mb-3 gap-2 relative">
              <button
                className="rounded-lg bg-sub text-white shadow-md p-2 hover:shadow-sm hover:bg-pink-700 transition-all duration-200 relative"
                onClick={() => router.back()}
              >
                돌아가기
              </button>

              <button
                className="rounded-lg bg-main shadow-md p-2 hover:shadow-sm hover:bg-amber-500 transition-all duration-200"
                onClick={() => {
                  setShowOptions(true);
                  setChanged(true);
                }}
              >
                작성완료
              </button>
              {Changed && (
                <div className={`absolute ${showOptions ? "waterfall" : "waterfall2re"} z-50`}>
                  <Options
                    options={options}
                    setOptions={setOptions}
                    categorys={categories}
                    setShowOptions={setShowOptions}
                    onSubmit={onSubmit}
                    userSeq={user!.member.seq}
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              className="bg-silver w-full border-2 rounded-t-lg p-2 shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <UiwEditor markdown={markdown} setMarkdown={setMarkdown} />
            <div className="mt-5 rounded-lg shadow-md w-full">
              <div className=" rounded-t-lg bg-main h-10 flex items-center ps-3 font-semibold">사용 기술스택</div>
              <textarea
                className="w-full min-h-[10rem] whitespace-pre-wrap p-3"
                placeholder={`ex)  "dependencies": {
                  "next": "13.5.6",
                  "react": "^18",
                }`}
                onChange={(e) => setDependency(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
