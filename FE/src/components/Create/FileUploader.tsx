"use client";
import { ContextStore, commands } from "@uiw/react-md-editor";
import { useState } from "react";
import { ImgUpload } from "@/constants/ImgUpload";
type Handle = {
  close: () => void;
  execute: () => void;
  getState?: (() => false | commands.TextState) | undefined;
  textApi?: commands.TextAreaTextApi | undefined;
  dispatch?: React.Dispatch<ContextStore> | undefined;
};

export default function FileUploader({ handle }: { handle: Handle }) {
  const [howUpload, seHowUpload] = useState(ImgUpload.FILE);
  const methodList = ["File", "URL"];
  return (
    <div>
      <div className="p-2 rounded-lg w-[20rem]">
        <div className="w-24 grid-2">
          {methodList.map((method, idx) => (
            <div className={`border-b-2 ${howUpload === idx && "border-main text-main"}`}>{method}</div>
          ))}
        </div>

        <div>{/* My Custom Toolbar: {JSON.stringify(handle.getState())} */}</div>
        <button
          type="button"
          onClick={() =>
            // console.log("> execute: >>>>>", handle.getState())
            console.log("")
          }
        >
          State
        </button>
        <button type="button" onClick={() => handle.close()}>
          Close
        </button>
        <button type="button" onClick={() => handle.execute()}>
          Execute
        </button>
      </div>
    </div>
  );
}
