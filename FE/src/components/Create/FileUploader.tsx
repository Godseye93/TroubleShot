"use client";
import { toast } from "react-toastify";
import { ContextStore, commands } from "@uiw/react-md-editor";
import { useRef, useState } from "react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
interface Handle {
  close: () => void;
  execute: () => void;
  getState?: (() => false | commands.TextState) | undefined;
  textApi?: commands.TextAreaTextApi | undefined;
  dispatch?: React.Dispatch<ContextStore> | undefined;
  onUploadComplete?: (params: string) => void;
}

export default function FileUploader({ handle }: { handle: Handle }) {
  const [howUpload, setHowUpload] = useState(0);
  const [imgFiles, setImgFiles] = useState<FileList | null[]>([]);
  const methodList = ["파일", "URL"];
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlImg, setUrlImg] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImgFiles(event.target.files);
    }
  };

  const uploadS3 = async () => {
    if (imgFiles.length === 0) return;
    try {
      const file = imgFiles[0];

      const fileName = file?.name.split(".")[0];
      const fileType = file?.name.split(".")[1];
      const blobImg = new Blob([file!], { type: file!.type });
      //업로드할 파일의 이름으로 Date 사용
      const name = Date.now();
      //s3 관련 설정들

      const s3client = new S3Client({
        region: process.env.NEXT_PUBLIC_BUCKEYT_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY ?? "",
          secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY ?? "",
        },
      });

      //앞서 생성한
      const params = {
        // ACL: "public-read",
        Bucket: process.env.NEXT_PUBLIC_BUCKEYT_NAME!,
        Key: `trouble/${name}.${fileType}`,
        Body: blobImg,
      };

      //이미지 업로드
      //업로드 된 이미지 url을 가져오기
      await s3client.send(new PutObjectCommand(params));
      const url_key = process.env.NEXT_PUBLIC_BUCKEYT_URL + `trouble/${name}.${fileType}`;

      console.log(url_key);

      //프로필 사진 변경을 위한 코드
      handle.onUploadComplete?.(url_key);
      // 가져온 위치에 이미지를 삽입한다
      return [fileName, url_key];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-4 rounded-lg w-[25rem] shadow-md">
        <div className="w-full grid grid-cols-2 hover:cursor-pointer text-base">
          {methodList.map((method, idx) => (
            <div
              onClick={() => setHowUpload(idx)}
              key={idx}
              className={`border-b-2 text-center ${howUpload === idx && "font-semibold border-main text-main"}`}
            >
              <p>{method}</p>
              <div className={`w-full h-1 ${howUpload === idx && "bg-main "}`}></div>
            </div>
          ))}
        </div>
        <div className="my-5">
          {howUpload === 0 && (
            <>
              <p className="text-xs font-semibold mb-2">선택한 파일</p>
              <div className="flex justify-between">
                <div className="w-64 h-8 rounded-lg border-2 text-xs text-slate-500 font-semibold px-2 flex items-center">
                  <p className="w-full line-clamp-1">
                    {imgFiles?.length > 0 ? imgFiles[0]?.name : "선택된 파일이 없습니다"}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="text-sm  bg-slate-200 w-24 p-1 rounded-lg shadow-md hover:shadow-sm hover:bg-slate-300 border transition-all duration-200"
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                  >
                    파일 선택
                  </button>
                  <input type="file" className="hidden" ref={fileRef} accept="image/*" onChange={onImageChange} />
                </div>
              </div>
            </>
          )}
          {howUpload === 1 && (
            <>
              <p className="text-xs font-semibold mb-2">이미지 URL</p>
              <div className="flex">
                <input
                  type="text"
                  className="w-full h-8 rounded-lg border-2 text-xs font-semibold px-2 flex items-center"
                  onChange={(e) => setUrlImg(e.target.value)}
                  placeholder="URL을 입력해 주세요"
                  value={urlImg}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="p-2 bg-sub text-white hover:bg-red-700 rounded-lg shadow-md hover:shadow-sm transition-all duration-200"
            onClick={() => {
              setImgFiles([]);
              setHowUpload(0);
              setUrlImg("");
              if (fileRef.current) fileRef.current.value = "";

              handle.close();
            }}
          >
            닫기
          </button>
          <button
            className="p-2 bg-main hover:bg-amber-600 rounded-lg shadow-md hover:shadow-sm transition-all duration-200"
            onClick={async () => {
              if (howUpload === 0) {
                try {
                  const res = await uploadS3();
                  if (res) {
                    handle.textApi?.replaceSelection(`![${res[0]}](${res[1]})`);
                    handle.close();
                    setImgFiles([]);
                    setHowUpload(0);
                    // eslint-disable-next-line
                    if (fileRef.current) fileRef.current.value = "";
                    setUrlImg("");
                    return;
                  }
                } catch (err) {
                  toast.error("업로드에 실패했습니다");
                  console.log(err);
                  return;
                }
              } else if (howUpload === 1) {
                handle.textApi?.replaceSelection(`![urlImg](${urlImg})`);
                setImgFiles([]);
                setHowUpload(0);
                setUrlImg("");
                handle.close();
                if (fileRef.current) fileRef.current.value = "";
              }
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
